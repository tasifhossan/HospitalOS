import type { SchedulerType } from './simulation';

export interface AlgorithmResult {
  id: string;
  comparisonRunId: string;
  algorithm: SchedulerType;
  avgWaitTimeMs: number;
  avgTreatmentTimeMs: number;
  throughput: number;
  completedCount: number;
  starvedCount: number;
  deadlockCount: number;
  durationMs: number;
}

export interface ComparisonRun {
  id: string;
  patientCount: number;
  workloadSeed: string;
  algorithms: SchedulerType[];
  results: AlgorithmResult[];
  createdAt: string;
}

export interface RunComparisonPayload {
  patientCount: number;
  workloadSeed: string;
  algorithms: SchedulerType[];
}
