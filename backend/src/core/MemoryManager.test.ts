import { describe, it, expect } from "vitest";
import { MemoryManager } from "./MemoryManager";

describe("MemoryManager", () => {
  it("should allocate and release session cache blocks and track memory usage", () => {
    const mm = new MemoryManager(5000);

    mm.allocateSession("session-1", { user: "admin" }, 1500);
    mm.allocateSession("session-2", { user: "doctor" }, 2000);

    expect(mm.getMemoryUsage()).toBe(3500);
    expect(mm.getAllocatedSessions()).toContain("session-1");
    expect(mm.getAllocatedSessions()).toContain("session-2");

    const block = mm.getSessionCache("session-1");
    expect(block).toBeDefined();
    expect(block?.data).toEqual({ user: "admin" });

    mm.releaseSession("session-1");
    expect(mm.getMemoryUsage()).toBe(2000);
    expect(mm.getAllocatedSessions()).not.toContain("session-1");
    expect(mm.getReleasedSessions()).toContain("session-1");
  });

  it("should throw error if duplicate allocation is attempted", () => {
    const mm = new MemoryManager(5000);
    mm.allocateSession("session-1", { user: "admin" }, 1000);

    expect(() => {
      mm.allocateSession("session-1", { user: "admin" }, 1000);
    }).toThrow();
  });

  it("should throw error if memory limit is exceeded", () => {
    const mm = new MemoryManager(1000);
    expect(() => {
      mm.allocateSession("session-1", { user: "admin" }, 2000);
    }).toThrow();
  });
});
