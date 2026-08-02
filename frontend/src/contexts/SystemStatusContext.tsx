'use client';

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useSocket } from '@/hooks/useSocket';

export type SystemHealthStatus = 'Healthy' | 'Warning' | 'Critical';
export type SchedulerRunningStatus = 'Running' | 'Paused' | 'Stopped';

interface SystemStatusContextValue {
  cpuUsage: number;
  memoryUsage: number;
  health: SystemHealthStatus;
  schedulerStatus: SchedulerRunningStatus;
  lastSyncTime: string;
}

const SystemStatusContext = createContext<SystemStatusContextValue | null>(null);

export function SystemStatusProvider({ children }: { children: ReactNode }) {
  const { isConnected, snapshot } = useSocket();
  const [cpuUsage, setCpuUsage] = useState(12);
  const [memoryUsage, setMemoryUsage] = useState(42);
  const [health, setHealth] = useState<SystemHealthStatus>('Healthy');
  const [schedulerStatus, setSchedulerStatus] = useState<SchedulerRunningStatus>('Running');
  const [lastSyncTime, setLastSyncTime] = useState<string>('Never');

  // CPU/Memory simulation to mimic OS kernel resource consumption
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3;
        const next = prev + delta;
        return Math.min(Math.max(next, 5), 85);
      });
      setMemoryUsage((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1;
        const next = prev + delta;
        return Math.min(Math.max(next, 38), 65);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Map kernel events to dashboard indicators
  useEffect(() => {
    if (snapshot) {
      setLastSyncTime(new Date().toLocaleTimeString());
      setSchedulerStatus('Running');
      if (snapshot.deadlockDetected) {
        setHealth('Critical');
      } else if (snapshot.readyQueue.length > 15) {
        setHealth('Warning');
      } else {
        setHealth('Healthy');
      }
    } else {
      if (!isConnected) {
        setSchedulerStatus('Stopped');
        setHealth('Warning');
      }
    }
  }, [snapshot, isConnected]);

  return (
    <SystemStatusContext.Provider
      value={{
        cpuUsage,
        memoryUsage,
        health,
        schedulerStatus,
        lastSyncTime,
      }}
    >
      {children}
    </SystemStatusContext.Provider>
  );
}

export function useSystemStatus() {
  const ctx = useContext(SystemStatusContext);
  if (!ctx) {
    throw new Error('useSystemStatus must be used within SystemStatusProvider');
  }
  return ctx;
}
