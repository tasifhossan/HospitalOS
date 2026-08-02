import type { SimulationSnapshot } from '@/types/simulation';

export const demoSimulationSnapshot: SimulationSnapshot = {
  tick: 485,
  simulatedTimeMs: 485000,
  activeScheduler: 'PRIORITY_AGING',
  readyQueue: [
    { id: 'sim-p-1', name: 'Robert Johnson', priority: 'HIGH', requiredResources: ['DOCTOR', 'ICU_BED'] as any, status: 'WAITING', arrivalTime: 480000, treatmentDurationMs: 25000 },
    { id: 'sim-p-2', name: 'Emily Davis', priority: 'MEDIUM', requiredResources: ['DOCTOR'] as any, status: 'WAITING', arrivalTime: 482000, treatmentDurationMs: 15000 },
    { id: 'sim-p-3', name: 'Michael Wilson', priority: 'LOW', requiredResources: ['DOCTOR'] as any, status: 'WAITING', arrivalTime: 484000, treatmentDurationMs: 10000 },
  ],
  inTreatment: [
    { id: 'sim-p-4', name: 'Emma Brown', priority: 'HIGH', requiredResources: ['DOCTOR', 'VENTILATOR'] as any, status: 'IN_TREATMENT', arrivalTime: 470000, treatmentDurationMs: 45000 },
  ],
  completed: Array.from({ length: 287 }, (_, i) => ({
    id: `comp-p-${i}`,
    name: `Completed Patient ${i + 1}`,
    priority: 'LOW',
    requiredResources: ['DOCTOR'],
    status: 'COMPLETED',
    arrivalTime: i * 10000,
    treatmentDurationMs: 15000,
  })),
  resources: [
    { type: 'DOCTOR' as any, capacity: 24, available: 18, allocated: 6 },
    { type: 'NURSE' as any, capacity: 38, available: 30, allocated: 8 },
    { type: 'ICU_BED' as any, capacity: 20, available: 12, allocated: 8 },
    { type: 'BED' as any, capacity: 8, available: 6, allocated: 2 },
    { type: 'CABIN' as any, capacity: 60, available: 45, allocated: 15 },
    { type: 'MRI' as any, capacity: 3, available: 2, allocated: 1 },
    { type: 'CT_SCAN' as any, capacity: 2, available: 1, allocated: 1 },
    { type: 'VENTILATOR' as any, capacity: 12, available: 8, allocated: 4 },
    { type: 'AMBULANCE' as any, capacity: 5, available: 4, allocated: 1 },
  ],
  deadlockDetected: false,
  stats: {
    totalPatients: 300,
    completed: 287,
    waiting: 4,
    inTreatment: 12,
    avgWaitTimeMs: 1600,
    avgTreatmentTimeMs: 4500,
    throughput: 0.93,
  },
};
export const demoComparisonResults = [
  { policy: 'Priority Scheduling', waitingTime: 120, turnaroundTime: 570, responseTime: 80 },
  { policy: 'Multi-Level Queue', waitingTime: 190, turnaroundTime: 640, responseTime: 110 },
  { policy: 'FCFS', waitingTime: 310, turnaroundTime: 760, responseTime: 280 },
  { policy: 'Round Robin', waitingTime: 215, turnaroundTime: 665, responseTime: 140 },
  { policy: 'SJF', waitingTime: 140, turnaroundTime: 590, responseTime: 90 },
];
export const demoScalabilityResults = [
  { requests: 100, cpu: 18, memory: 40, waitingTime: 120 },
  { requests: 500, cpu: 52, memory: 65, waitingTime: 280 },
  { requests: 1000, cpu: 89, memory: 91, waitingTime: 650 },
];
