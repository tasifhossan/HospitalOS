import type { PatientFile } from '@/types/file';

export const demoFiles: PatientFile[] = Array.from({ length: 20 }, (_, i) => ({
  id: `file-${i + 1}`,
  patientId: `patient-${(i % 5) + 1}`,
  fileName: i % 2 === 0 ? `MedicalReport_Patient_${i + 1}.enc` : `Prescription_Patient_${i + 1}.enc`,
  fileType: (i % 2 === 0 ? 'MEDICAL_REPORT' : 'PRESCRIPTION') as any,
  encryptedData: 'dGVzdGRhdGE=',
  iv: 'dGVzdGl2',
  uploadedBy: 'doctor@hospital.local',
  uploadedAt: new Date(Date.now() - i * 7200000).toISOString(),
}));
export const demoFileStats = {
  totalUsageBytes: 458990201, // 458.9 MB
  encryptedFilesCount: 1270,
  lockedFilesCount: 6,
  todayUploadsCount: 21,
  recentDownloads: [
    { fileName: 'MedicalReport_u12.enc', downloadedBy: 'doctor@hospital.local', timestamp: new Date(Date.now() - 300000).toISOString() },
    { fileName: 'Prescription_u4.enc', downloadedBy: 'nurse@hospital.local', timestamp: new Date(Date.now() - 900000).toISOString() },
  ],
};
export const demoPreEncryptionIntegrity = {
  status: 'Pass',
  hash: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2',
  algorithm: 'SHA-256 integrity check verified',
  sizeBytes: 15420,
};
export const demoFileDetails = {
  id: 'file-1270',
  fileName: 'MedicalReport_Patient_12.enc',
  owner: 'John Doe',
  fileType: 'MRI',
  uploadedAt: new Date().toLocaleDateString(),
  keyRingLevel: 2,
};
export const demoFileAccessAudits = [
  { id: 'audit-1', accessorEmail: 'doctor@hospital.local', accessType: 'DOWNLOAD', timestamp: new Date().toLocaleString(), success: true },
  { id: 'audit-2', accessorEmail: 'patient@hospital.local', accessType: 'DOWNLOAD', timestamp: new Date(Date.now() - 3600000).toLocaleString(), success: false },
];
