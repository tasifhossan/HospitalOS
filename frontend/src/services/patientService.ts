import api from '@/lib/api';
import type { RegisteredPatient, CreatePatientPayload, UpdatePatientPayload } from '@/types/patient';

const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export const patientService = {
  async list(): Promise<RegisteredPatient[]> {
    if (isDemo) {
      const { demoPatients } = await import('@/demo/patients');
      return demoPatients;
    }
    try {
      const { data } = await api.get<{ success: boolean; data: RegisteredPatient[] }>('/patients');
      return data.data;
    } catch (err) {
      console.warn('Backend patient list failed, falling back to Demo Data:', err);
      const { demoPatients } = await import('@/demo/patients');
      return demoPatients;
    }
  },

  async create(payload: CreatePatientPayload): Promise<{ message: string; patient: RegisteredPatient }> {
    if (isDemo) {
      return { message: 'Demo Patient provisioned successfully.', patient: { id: `demo-${Date.now()}`, name: payload.name, condition: payload.condition, priority: payload.priority, requiredResources: payload.requiredResources, status: 'WAITING', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } };
    }
    const { data } = await api.post('/patients', payload);
    return data;
  },

  async update(id: string, payload: UpdatePatientPayload): Promise<RegisteredPatient> {
    if (isDemo) {
      return { id, name: payload.name || 'Jane Doe', condition: payload.condition || '', priority: payload.priority || 'LOW', requiredResources: payload.requiredResources || [], status: payload.status || 'WAITING', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    }
    const { data } = await api.put<RegisteredPatient>(`/patients/${id}`, payload);
    return data;
  },

  async remove(id: string): Promise<{ message: string }> {
    if (isDemo) {
      return { message: 'Demo Patient deallocated successfully.' };
    }
    const { data } = await api.delete(`/patients/${id}`);
    return data;
  },
};
