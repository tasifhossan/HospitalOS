import api from '@/lib/api';
import type { Appointment, CreateAppointmentPayload, UpdateAppointmentPayload } from '@/types/appointment';

export const appointmentService = {
  async list(): Promise<Appointment[]> {
    const { data } = await api.get<Appointment[]>('/appointments');
    return data;
  },

  async create(payload: CreateAppointmentPayload): Promise<Appointment> {
    const { data } = await api.post<Appointment>('/appointments', payload);
    return data;
  },

  async update(id: string, payload: UpdateAppointmentPayload): Promise<Appointment> {
    const { data } = await api.put<Appointment>(`/appointments/${id}`, payload);
    return data;
  },

  async cancel(id: string): Promise<{ message: string }> {
    const { data } = await api.delete(`/appointments/${id}`);
    return data;
  },
};
