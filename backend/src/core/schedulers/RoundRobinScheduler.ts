import { Patient } from "../../types/patient";
import { Scheduler } from "./Scheduler";

/**
 * RoundRobinScheduler.ts
 *
 * Round Robin (RR) scheduling implementation.
 *
 * OS Analogue:
 * - Preemptive time-sliced scheduling.
 *   Each process is assigned a fixed time slice (time quantum). If it does not complete
 *   within this quantum, it is preempted, its resources are released, and it is placed
 *   back at the end of the ready queue.
 */
export class RoundRobinScheduler implements Scheduler {
  readonly name = "Round Robin Queue";
  private queue: Patient[] = [];
  private readonly timeQuantumMs: number;

  constructor(timeQuantumMs = 2000) {
    this.timeQuantumMs = timeQuantumMs;
  }

  enqueue(patient: Patient): void {
    if (patient.queuedAt === undefined) {
      patient.queuedAt = Date.now();
    }
    // Round Robin adds new/preempted processes to the back of the queue
    this.queue.push(patient);
  }

  next(): Patient | undefined {
    return this.queue.shift();
  }

  peekQueue(): Patient[] {
    return [...this.queue];
  }

  queueLength(): number {
    return this.queue.length;
  }

  shouldPreempt(patient: Patient, currentTime: number): boolean {
    if (patient.treatmentStartedAt === undefined) return false;
    const elapsed = currentTime - patient.treatmentStartedAt;
    // Preempt if elapsed time meets or exceeds the quantum and there is still remaining treatment time
    return elapsed >= this.timeQuantumMs && patient.treatmentDurationMs > elapsed;
  }
}
