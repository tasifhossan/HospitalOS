export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';
export type ResourceType = 'DOCTOR' | 'BED' | 'ICU_BED';
export type PatientStatus = 'WAITING' | 'IN_TREATMENT' | 'COMPLETED' | 'CANCELLED';

export interface RegisteredPatient {
  id: string;
  name: string;
  condition: string;
  priority: Priority;
  requiredResources: ResourceType[];
  status: PatientStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePatientPayload {
  name: string;
  condition: string;
  priority: Priority;
  requiredResources: ResourceType[];
  registeredBy: string;
}

export interface UpdatePatientPayload {
  name?: string;
  condition?: string;
  priority?: Priority;
  requiredResources?: ResourceType[];
  status?: PatientStatus;
}
