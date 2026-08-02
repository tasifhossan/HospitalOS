export type AppointmentStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';

export interface Appointment {
  id: string;
  patientName: string;
  staffId: string;
  scheduledAt: string;
  reason: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppointmentPayload {
  patientName: string;
  staffId: string;
  scheduledAt: string;
  reason: string;
}

export interface UpdateAppointmentPayload {
  patientName?: string;
  staffId?: string;
  scheduledAt?: string;
  reason?: string;
  status?: AppointmentStatus;
}
