import api from '@/lib/api';
import type { PatientFile, UploadFileResponse } from '@/types/file';

const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export const fileService = {
  async listForPatient(patientId: string): Promise<PatientFile[]> {
    if (isDemo) {
      const { demoFiles } = await import('@/demo/files');
      return demoFiles.filter((f) => f.patientId === patientId);
    }
    try {
      const { data } = await api.get<{ success: boolean; data: PatientFile[] }>(`/files/patient/${patientId}`);
      return data.data;
    } catch (err) {
      console.warn('Backend file list failed, falling back to Demo Data:', err);
      const { demoFiles } = await import('@/demo/files');
      return demoFiles.filter((f) => f.patientId === patientId);
    }
  },

  async upload(patientId: string, fileType: string, file: File): Promise<UploadFileResponse> {
    if (isDemo) {
      return { id: `demo-file-${Date.now()}`, patientId, fileName: file.name, fileType: fileType as any, uploadedBy: 'doctor@hospital.local', uploadedAt: new Date().toISOString() };
    }
    const form = new FormData();
    form.append('patientId', patientId);
    form.append('fileType', fileType);
    form.append('file', file);
    const { data } = await api.post<{ success: boolean; data: UploadFileResponse }>('/files/upload', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  },

  async download(fileId: string): Promise<Blob> {
    if (isDemo) {
      return new Blob(['demo-file-binary-contents'], { type: 'text/plain' });
    }
    const { data } = await api.get<Blob>(`/files/download/${fileId}`, {
      responseType: 'blob',
    });
    return data;
  },

  async getPrescriptions(patientId: string): Promise<PatientFile[]> {
    if (isDemo) {
      const { demoFiles } = await import('@/demo/files');
      return demoFiles.filter((f) => f.patientId === patientId && f.fileType === 'PRESCRIPTION');
    }
    try {
      const { data } = await api.get<{ success: boolean; data: PatientFile[] }>(`/files/patient/${patientId}/prescriptions`);
      return data.data;
    } catch (err) {
      console.warn('Backend prescriptions failed, falling back to Demo Data:', err);
      const { demoFiles } = await import('@/demo/files');
      return demoFiles.filter((f) => f.patientId === patientId && f.fileType === 'PRESCRIPTION');
    }
  },

  async getReports(patientId: string): Promise<PatientFile[]> {
    if (isDemo) {
      const { demoFiles } = await import('@/demo/files');
      return demoFiles.filter((f) => f.patientId === patientId && f.fileType === 'MEDICAL_REPORT');
    }
    try {
      const { data } = await api.get<{ success: boolean; data: PatientFile[] }>(`/files/patient/${patientId}/reports`);
      return data.data;
    } catch (err) {
      console.warn('Backend reports failed, falling back to Demo Data:', err);
      const { demoFiles } = await import('@/demo/files');
      return demoFiles.filter((f) => f.patientId === patientId && f.fileType === 'MEDICAL_REPORT');
    }
  },
};
