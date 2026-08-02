/**
 * MemoryManager.ts
 *
 * Lightweight Memory Manager simulating OS page tables, frame allocations,
 * and session state tracking.
 */
export interface SessionCacheBlock {
  sessionId: string;
  data: any;
  allocatedAt: number;
  sizeBytes: number;
}

export class MemoryManager {
  private allocatedSessions = new Set<string>();
  private releasedSessions = new Set<string>();
  private currentSessionCache = new Map<string, SessionCacheBlock>();
  private memoryUsageBytes = 0;
  private readonly maxMemoryBytes: number;

  constructor(maxMemoryBytes = 1024 * 1024) { // 1MB default
    this.maxMemoryBytes = maxMemoryBytes;
  }

  allocateSession(sessionId: string, data: any, sizeBytes = 1024): void {
    if (this.allocatedSessions.has(sessionId)) {
      throw new Error(`Session ${sessionId} already allocated (prevent duplicate session mapping)`);
    }

    if (this.memoryUsageBytes + sizeBytes > this.maxMemoryBytes) {
      throw new Error(`Out of Memory: Cannot allocate ${sizeBytes} bytes for session ${sessionId}`);
    }

    const block: SessionCacheBlock = {
      sessionId,
      data,
      allocatedAt: Date.now(),
      sizeBytes,
    };

    this.allocatedSessions.add(sessionId);
    this.currentSessionCache.set(sessionId, block);
    this.memoryUsageBytes += sizeBytes;
  }

  releaseSession(sessionId: string): void {
    if (!this.allocatedSessions.has(sessionId)) {
      return;
    }

    const block = this.currentSessionCache.get(sessionId);
    if (block) {
      this.memoryUsageBytes -= block.sizeBytes;
      this.currentSessionCache.delete(sessionId);
    }

    this.allocatedSessions.delete(sessionId);
    this.releasedSessions.add(sessionId);
  }

  getAllocatedSessions(): string[] {
    return Array.from(this.allocatedSessions);
  }

  getReleasedSessions(): string[] {
    return Array.from(this.releasedSessions);
  }

  getSessionCache(sessionId: string): SessionCacheBlock | undefined {
    return this.currentSessionCache.get(sessionId);
  }

  getMemoryUsage(): number {
    return this.memoryUsageBytes;
  }

  getMaxMemory(): number {
    return this.maxMemoryBytes;
  }

  reset(): void {
    this.allocatedSessions.clear();
    this.releasedSessions.clear();
    this.currentSessionCache.clear();
    this.memoryUsageBytes = 0;
  }
}
