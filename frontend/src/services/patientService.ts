import api from '@/lib/api';
import type { RegisteredPatient, CreatePatientPayload, UpdatePatientPayload } from '@/types/patient';

export const patientService = {
  async list(): Promise<RegisteredPatient[]> {
    const { data } = await api.get<{ success: boolean; data: RegisteredPatient[] }>('/patients');
    return data.data;
  },

  async create(payload: CreatePatientPayload): Promise<{ message: string; patient: RegisteredPatient }> {
    const { data } = await api.post('/patients', payload);
    return data;
  },

  async update(id: string, payload: UpdatePatientPayload): Promise<RegisteredPatient> {
    const { data } = await api.put<RegisteredPatient>(`/patients/${id}`, payload);
    return data;
  },

  async remove(id: string): Promise<{ message: string }> {
    const { data } = await api.delete(`/patients/${id}`);
    return data;
  },
};
