import { describe, it, expect } from "vitest";
import { RoundRobinScheduler } from "./RoundRobinScheduler";
import { Patient } from "../../types/patient";

describe("RoundRobinScheduler", () => {
  it("should enqueue and dequeue in FIFO order when no preemption occurs", () => {
    const rr = new RoundRobinScheduler(2000);
    const p1: Patient = {
      id: "P1",
      name: "Patient One",
      priority: "LOW",
      arrivalTime: 0,
      requiredResources: [],
      treatmentDurationMs: 1000,
      status: "WAITING",
    };
    const p2: Patient = {
      id: "P2",
      name: "Patient Two",
      priority: "HIGH",
      arrivalTime: 500,
      requiredResources: [],
      treatmentDurationMs: 1500,
      status: "WAITING",
    };

    rr.enqueue(p1);
    rr.enqueue(p2);

    expect(rr.queueLength()).toBe(2);
    expect(rr.next()).toBe(p1);
    expect(rr.next()).toBe(p2);
    expect(rr.next()).toBeUndefined();
  });

  it("should correctly identify when a patient should be preempted", () => {
    const rr = new RoundRobinScheduler(2000);
    const patient: Patient = {
      id: "P1",
      name: "Patient One",
      priority: "LOW",
      arrivalTime: 0,
      requiredResources: [],
      treatmentDurationMs: 3000,
      status: "IN_TREATMENT",
      treatmentStartedAt: 1000,
    };

    // Elapsed time 1000ms < 2000ms quantum -> do not preempt
    expect(rr.shouldPreempt(patient, 2000)).toBe(false);

    // Elapsed time 2000ms >= 2000ms quantum, remaining time (3000ms) > elapsed -> preempt
    expect(rr.shouldPreempt(patient, 3000)).toBe(true);

    // Elapsed time 3000ms >= 2000ms quantum, but remaining time (3000ms) <= elapsed -> do not preempt (finishing)
    patient.treatmentDurationMs = 2000;
    expect(rr.shouldPreempt(patient, 3000)).toBe(false);
  });
});
