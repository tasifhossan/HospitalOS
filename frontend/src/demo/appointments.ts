import type { Appointment } from '@/types/appointment';

export const demoAppointments: Appointment[] = Array.from({ length: 68 }, (_, i) => ({
  id: `appt-${i + 1}`,
  patientName: `Patient Name ${i + 1}`,
  staffId: `staff-${(i % 3) + 1}`,
  staff: {
    id: `staff-${(i % 3) + 1}`,
    name: i % 3 === 0 ? 'Dr. Gregory House' : i % 3 === 1 ? 'Dr. Stephen Strange' : 'Dr. Meredith Grey',
    role: 'DOCTOR',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  scheduledAt: new Date(Date.now() + i * 1800000).toISOString(),
  reason: i % 2 === 0 ? 'Cardiology Consultation' : 'General Checkup',
  status: i < 49 ? 'COMPLETED' : i < 53 ? 'CANCELLED' : 'SCHEDULED',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));
