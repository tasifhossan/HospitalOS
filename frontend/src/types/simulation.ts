import type { Priority, ResourceType } from './patient';

export type SchedulerType =
  | 'FCFS'
  | 'SJF'
  | 'PRIORITY_AGING'
  | 'MULTILEVEL'
  | 'ROUND_ROBIN';

export type SimPatientStatus = 'WAITING' | 'IN_TREATMENT' | 'COMPLETED' | 'PREEMPTED';

export interface SimPatient {
  id: string;
  name: string;
  priority: Priority;
  requiredResources: ResourceType[];
  status: SimPatientStatus;
  arrivalTime: number;
  treatmentDurationMs: number;
  startTime?: number;
  completedTime?: number;
}

export interface ResourceState {
  type: ResourceType;
  capacity: number;
  available: number;
  allocated: number;
}

export interface SimulationSnapshot {
  tick: number;
  simulatedTimeMs: number;
  activeScheduler: SchedulerType;
  readyQueue: SimPatient[];
  inTreatment: SimPatient[];
  completed: SimPatient[];
  resources: ResourceState[];
  deadlockDetected: boolean;
  deadlockCycle?: string[];
  stats: SimStats;
}

export interface SimStats {
  totalPatients: number;
  completed: number;
  waiting: number;
  inTreatment: number;
  avgWaitTimeMs: number;
  avgTreatmentTimeMs: number;
  throughput: number;
}

export interface SwitchSchedulerPayload {
  type: SchedulerType;
  timeQuantumMs?: number;
}

export interface IncreaseCapacityPayload {
  resource: ResourceType;
  by: number;
}

// Socket.io event payloads
export interface DeadlockDetectedEvent {
  cycle: string[];
  detectedAt: number;
}

export interface SchedulerChangedEvent {
  from: SchedulerType;
  to: SchedulerType;
  timeQuantumMs?: number;
}

export interface ResourceCapacityChangedEvent {
  resource: ResourceType;
  newCapacity: number;
  delta: number;
}
