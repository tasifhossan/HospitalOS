export type FileType =
  | 'PRESCRIPTION'
  | 'MEDICAL_REPORT'
  | 'LAB_REPORT'
  | 'MRI'
  | 'CT_SCAN'
  | 'X_RAY'
  | 'INVOICE';

export interface PatientFile {
  id: string;
  patientId: string;
  fileType: FileType;
  fileName: string;
  mimeType?: string;
  sizeBytes?: number;
  uploadedBy: string;
  uploadedAt: string;
}

export interface UploadFilePayload {
  patientId: string;
  fileType: FileType;
  file: File;
}

export interface UploadFileResponse {
  id: string;
  patientId: string;
  fileName: string;
  fileType: FileType;
  uploadedBy: string;
  uploadedAt: string;
}
