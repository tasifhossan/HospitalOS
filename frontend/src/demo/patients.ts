import type { RegisteredPatient } from '@/types/patient';

export const demoPatients: RegisteredPatient[] = Array.from({ length: 150 }, (_, i) => ({
  id: `patient-${i + 1}`,
  name: `Patient Name ${i + 1}`,
  condition: i % 4 === 0 ? 'Severe Chest Congestion' : i % 4 === 1 ? 'Post-Op Observation' : i % 4 === 2 ? 'Fracture Treatment' : 'Regular Health Checkup',
  priority: (i % 10 === 0 ? 'HIGH' : i % 10 < 4 ? 'MEDIUM' : 'LOW') as any,
  requiredResources: (i % 3 === 0 ? ['DOCTOR'] : i % 3 === 1 ? ['ICU_BED', 'DOCTOR'] : ['BED', 'DOCTOR']) as any,
  status: 'WAITING',
  createdAt: new Date(Date.now() - i * 3600000).toISOString(),
  updatedAt: new Date(Date.now() - i * 3600000).toISOString(),
}));
