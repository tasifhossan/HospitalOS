import { demoPatients } from '@/demo/patients';
import { demoAppointments } from '@/demo/appointments';
import type { RegisteredPatient } from '@/types/patient';
import type { Appointment } from '@/types/appointment';

export const demoPatientService = {
  async list(): Promise<RegisteredPatient[]> {
    return demoPatients;
  },
  async getAppointments(): Promise<Appointment[]> {
    return demoAppointments;
  },
};
export default demoPatientService;
