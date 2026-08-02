import api from '@/lib/api';
import type { PatientFile, UploadFileResponse } from '@/types/file';

export const fileService = {
  async listForPatient(patientId: string): Promise<PatientFile[]> {
    const { data } = await api.get<{ success: boolean; data: PatientFile[] }>(`/files/patient/${patientId}`);
    return data.data;
  },

  async upload(patientId: string, fileType: string, file: File): Promise<UploadFileResponse> {
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
    const { data } = await api.get<Blob>(`/files/download/${fileId}`, {
      responseType: 'blob',
    });
    return data;
  },

  async getPrescriptions(patientId: string): Promise<PatientFile[]> {
    const { data } = await api.get<{ success: boolean; data: PatientFile[] }>(`/files/patient/${patientId}/prescriptions`);
    return data.data;
  },

  async getReports(patientId: string): Promise<PatientFile[]> {
    const { data } = await api.get<{ success: boolean; data: PatientFile[] }>(`/files/patient/${patientId}/reports`);
    return data.data;
  },
};
