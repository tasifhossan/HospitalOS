'use client';

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { type Socket } from 'socket.io-client';
import { connectSocket, disconnectSocket } from '@/lib/socket';
import { useAuth } from '@/hooks/useAuth';
import type {
  SimulationSnapshot,
  DeadlockDetectedEvent,
  SchedulerChangedEvent,
  ResourceCapacityChangedEvent,
} from '@/types/simulation';
import type { SimPatient } from '@/types/simulation';

interface SocketContextValue {
  socket: Socket | null;
  isConnected: boolean;
  snapshot: SimulationSnapshot | null;
  lastDeadlock: DeadlockDetectedEvent | null;
  lastSchedulerChange: SchedulerChangedEvent | null;
  lastCapacityChange: ResourceCapacityChangedEvent | null;
  lastArrivedPatient: SimPatient | null;
}

export const SocketContext = createContext<SocketContextValue | null>(null);

export function SocketProvider({ children }: { children: ReactNode }) {
  const { token, isAuthenticated } = useAuth();
  const socketRef = useRef<Socket | null>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [snapshot, setSnapshot] = useState<SimulationSnapshot | null>(null);
  const [lastDeadlock, setLastDeadlock] = useState<DeadlockDetectedEvent | null>(null);
  const [lastSchedulerChange, setLastSchedulerChange] = useState<SchedulerChangedEvent | null>(null);
  const [lastCapacityChange, setLastCapacityChange] = useState<ResourceCapacityChangedEvent | null>(null);
  const [lastArrivedPatient, setLastArrivedPatient] = useState<SimPatient | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const s = connectSocket(token);
    socketRef.current = s;

    s.on('connect', () => setIsConnected(true));
    s.on('disconnect', () => setIsConnected(false));
    s.on('simulation:snapshot', (data: SimulationSnapshot) => setSnapshot(data));
    s.on('deadlock:detected', (data: DeadlockDetectedEvent) => setLastDeadlock(data));
    s.on('scheduler:changed', (data: SchedulerChangedEvent) => setLastSchedulerChange(data));
    s.on('resource:capacityChanged', (data: ResourceCapacityChangedEvent) => setLastCapacityChange(data));
    s.on('patient:arrived', (data: SimPatient) => setLastArrivedPatient(data));

    return () => {
      s.off('connect');
      s.off('disconnect');
      s.off('simulation:snapshot');
      s.off('deadlock:detected');
      s.off('scheduler:changed');
      s.off('resource:capacityChanged');
      s.off('patient:arrived');
      disconnectSocket();
    };
  }, [isAuthenticated, token]);

  const value = useMemo(
    () => ({
      socket: socketRef.current,
      isConnected,
      snapshot,
      lastDeadlock,
      lastSchedulerChange,
      lastCapacityChange,
      lastArrivedPatient,
    }),
    [isConnected, snapshot, lastDeadlock, lastSchedulerChange, lastCapacityChange, lastArrivedPatient],
  );

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}
