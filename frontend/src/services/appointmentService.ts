import api from '@/lib/api';
import type { Appointment, CreateAppointmentPayload, UpdateAppointmentPayload } from '@/types/appointment';

export const appointmentService = {
  async list(): Promise<Appointment[]> {
    const { data } = await api.get<{ success: boolean; data: Appointment[] }>('/appointments');
    return data.data;
  },

  async create(payload: CreateAppointmentPayload): Promise<Appointment> {
    const { data } = await api.post<{ success: boolean; data: Appointment }>('/appointments', payload);
    return data.data;
  },

  async update(id: string, payload: UpdateAppointmentPayload): Promise<Appointment> {
    const { data } = await api.put<{ success: boolean; data: Appointment }>(`/appointments/${id}`, payload);
    return data.data;
  },

  async cancel(id: string): Promise<{ message: string }> {
    const { data } = await api.patch<{ success: boolean; message: string }>(`/appointments/${id}/cancel`);
    return data;
  },
};
