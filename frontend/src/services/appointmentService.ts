import api from '@/lib/api';
import type { Appointment, CreateAppointmentPayload, UpdateAppointmentPayload } from '@/types/appointment';

const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export const appointmentService = {
  async list(): Promise<Appointment[]> {
    if (isDemo) {
      const { demoAppointments } = await import('@/demo/appointments');
      return demoAppointments;
    }
    try {
      const { data } = await api.get<{ success: boolean; data: Appointment[] }>('/appointments');
      return data.data;
    } catch (err) {
      console.warn('Backend listAppointments failed, falling back to Demo Data:', err);
      const { demoAppointments } = await import('@/demo/appointments');
      return demoAppointments;
    }
  },

  async create(payload: CreateAppointmentPayload): Promise<Appointment> {
    if (isDemo) {
      return { id: `demo-app-${Date.now()}`, patientName: payload.patientName, staffId: payload.staffId, staff: { id: payload.staffId, name: 'Assigned Specialist', role: 'DOCTOR', status: 'ACTIVE', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }, scheduledAt: payload.scheduledAt, reason: payload.reason, status: 'SCHEDULED', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    }
    const { data } = await api.post<{ success: boolean; data: Appointment }>('/appointments', payload);
    return data.data;
  },

  async update(id: string, payload: UpdateAppointmentPayload): Promise<Appointment> {
    if (isDemo) {
      return { id, patientName: 'John Doe', staffId: payload.staffId || 'staff-1', staff: { id: payload.staffId || 'staff-1', name: 'Assigned Specialist', role: 'DOCTOR', status: 'ACTIVE', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }, scheduledAt: payload.scheduledAt || new Date().toISOString(), reason: 'Consultation Check', status: payload.status || 'SCHEDULED', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    }
    const { data } = await api.put<{ success: boolean; data: Appointment }>(`/appointments/${id}`, payload);
    return data.data;
  },

  async cancel(id: string): Promise<{ message: string }> {
    if (isDemo) {
      return { message: 'Demo Appointment cancelled successfully.' };
    }
    const { data } = await api.patch<{ success: boolean; message: string }>(`/appointments/${id}/cancel`);
    return data;
  },
};
