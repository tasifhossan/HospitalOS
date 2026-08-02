import { Router, Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { requireAuth } from "../auth/authMiddleware";
import { EncryptionService } from "../services/EncryptionService";

export const fileRoutes = Router();

// Apply auth middleware to all file routes
fileRoutes.use(requireAuth);

/**
 * POST /api/files/upload
 * Upload and encrypt a medical file.
 */
fileRoutes.post("/upload", async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { patientId, fileName, fileType, fileContent } = req.body;

  if (!patientId || !fileName || !fileType || !fileContent) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields (patientId, fileName, fileType, fileContent).",
    });
  }

  // Supported file types: PRESCRIPTION, MEDICAL_REPORT, LAB_REPORT, MRI, CT_SCAN, X_RAY, INVOICE
  const validTypes = ["PRESCRIPTION", "MEDICAL_REPORT", "LAB_REPORT", "MRI", "CT_SCAN", "X_RAY", "INVOICE"];
  if (!validTypes.includes(fileType)) {
    return res.status(400).json({
      success: false,
      message: `Invalid fileType. Must be one of: ${validTypes.join(", ")}`,
    });
  }

  // Prevent duplicate allocations / uploads if the same file is already uploaded
  const existing = await prisma.patientFile.findFirst({
    where: { patientId, fileName },
  });
  if (existing) {
    return res.status(409).json({
      success: false,
      message: "Duplicate file: A file with the same name already exists for this patient.",
    });
  }

  try {
    // Encrypt content
    const { encryptedData, iv } = EncryptionService.encrypt(fileContent);

    // Save record to DB
    const file = await prisma.patientFile.create({
      data: {
        patientId,
        fileName,
        fileType,
        encryptedData,
        iv,
        uploadedBy: user.email,
      },
    });

    // Write audit log
    await prisma.auditFileAccess.create({
      data: {
        fileId: file.id,
        accessorEmail: user.email,
        accessType: "UPLOAD",
        success: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "File uploaded and encrypted successfully.",
      data: {
        id: file.id,
        patientId: file.patientId,
        fileName: file.fileName,
        fileType: file.fileType,
        uploadedBy: file.uploadedBy,
        uploadedAt: file.uploadedAt,
      },
    });
  } catch (error: any) {
    console.error("[SecureFileManagement] Upload Error:", error);
    return res.status(500).json({
      success: false,
      message: `Failed to upload file: ${error.message}`,
    });
  }
});

/**
 * GET /api/files/patient/:patientId
 * Retrieve list of files for a patient.
 */
fileRoutes.get("/patient/:patientId", async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { patientId } = req.params;

  if (user.accessRole === "PATIENT" && user.userId !== patientId) {
    return res.status(403).json({
      success: false,
      message: "Forbidden: You cannot access files for other patients.",
    });
  }

  try {
    const files = await prisma.patientFile.findMany({
      where: { patientId: patientId as string },
      orderBy: { uploadedAt: "desc" },
    });

    return res.status(200).json({
      success: true,
      message: "Patient files retrieved successfully.",
      data: files.map((file) => ({
        id: file.id,
        patientId: file.patientId,
        fileName: file.fileName,
        fileType: file.fileType,
        uploadedBy: file.uploadedBy,
        uploadedAt: file.uploadedAt,
      })),
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `Failed to list files: ${error.message}`,
    });
  }
});

/**
 * GET /api/files/patient/:patientId/prescriptions
 */
fileRoutes.get("/patient/:patientId/prescriptions", async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { patientId } = req.params;

  if (user.accessRole === "PATIENT" && user.userId !== patientId) {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }

  try {
    const items = await prisma.prescription.findMany({
      where: { patientId: patientId as string },
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json({ success: true, message: "Prescriptions", data: items });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * GET /api/files/patient/:patientId/reports
 */
fileRoutes.get("/patient/:patientId/reports", async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { patientId } = req.params;

  if (user.accessRole === "PATIENT" && user.userId !== patientId) {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }

  try {
    const medical = await prisma.medicalReport.findMany({
      where: { patientId: patientId as string },
      orderBy: { createdAt: "desc" },
    });
    const lab = await prisma.labReport.findMany({
      where: { patientId: patientId as string },
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json({
      success: true,
      message: "Reports",
      data: { medical, lab },
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * GET /api/files/download/:id
 * Decrypt and download a medical file.
 */
fileRoutes.get("/download/:id", async (req: Request, res: Response) => {
  const user = (req as any).user;
  const fileId = req.params.id as string;

  try {
    const file = await prisma.patientFile.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found.",
      });
    }

    // Role-based access permission check
    let allowed = false;

    if (user.accessRole === "ADMIN") {
      allowed = true;
    } else if (user.accessRole === "PATIENT") {
      // Patient can only access their own files
      if (file.patientId === user.userId) {
        allowed = true;
      }
    } else if (user.accessRole === "DOCTOR") {
      // Doctor can access if they are assigned to the patient
      const assignment = await prisma.doctorAssignment.findFirst({
        where: {
          patientId: file.patientId,
          doctorId: {
            in: [user.userId, user.staffMemberId || ""],
          },
        },
      });
      if (assignment) {
        allowed = true;
      }
    } else if (user.accessRole === "NURSE" || user.accessRole === "RECEPTIONIST") {
      // Nurses and Receptionists can access files if they are in the active system
      allowed = true;
    }

    if (!allowed) {
      // Write failed audit log
      await prisma.auditFileAccess.create({
        data: {
          fileId: file.id,
          accessorEmail: user.email,
          accessType: "DOWNLOAD",
          success: false,
        },
      });

      return res.status(403).json({
        success: false,
        message: "Forbidden: You do not have permission to access this file.",
      });
    }

    // Decrypt content
    const decrypted = EncryptionService.decrypt(file.encryptedData, file.iv);

    // Write successful audit log
    await prisma.auditFileAccess.create({
      data: {
        fileId: file.id,
        accessorEmail: user.email,
        accessType: "DOWNLOAD",
        success: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "File decrypted and downloaded successfully.",
      data: {
        id: file.id,
        fileName: file.fileName,
        fileType: file.fileType,
        decryptedContent: decrypted,
      },
    });
  } catch (error: any) {
    console.error("[SecureFileManagement] Download Error:", error);
    return res.status(500).json({
      success: false,
      message: `Failed to download file: ${error.message}`,
    });
  }
});
