'use client';

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useSocket } from '@/hooks/useSocket';

export type NotificationCategory =
  | 'SYSTEM'
  | 'SCHEDULER'
  | 'MEMORY'
  | 'RESOURCE'
  | 'MEDICAL'
  | 'FILE_PROTECTION'
  | 'DEADLOCK_PREVENTION'
  | 'USER_MANAGEMENT'
  | 'SECURITY';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  timestamp: string;
  read: boolean;
}

interface NotificationContextValue {
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const { lastDeadlock, lastSchedulerChange, lastCapacityChange, lastArrivedPatient } = useSocket();

  const addNotification = (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: NotificationItem = {
      ...item,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Wire Socket.io events to generate local real-time notifications
  useEffect(() => {
    if (lastDeadlock) {
      addNotification({
        title: 'Security / System Alert',
        message: `Deadlock detected in wait-for graph: [${lastDeadlock.cycle.join(' -> ')}]`,
        category: 'DEADLOCK_PREVENTION',
      });
    }
  }, [lastDeadlock]);

  useEffect(() => {
    if (lastSchedulerChange) {
      addNotification({
        title: 'Scheduler Config Changed',
        message: `Active scheduling algorithm switched to ${lastSchedulerChange.to}`,
        category: 'SCHEDULER',
      });
    }
  }, [lastSchedulerChange]);

  useEffect(() => {
    if (lastCapacityChange) {
      addNotification({
        title: 'Resource Capacity Updated',
        message: `Resource pool ${lastCapacityChange.resource} capacity increased by ${lastCapacityChange.delta}`,
        category: 'RESOURCE',
      });
    }
  }, [lastCapacityChange]);

  useEffect(() => {
    if (lastArrivedPatient) {
      addNotification({
        title: 'Patient Queue Update',
        message: `New patient registered: ${lastArrivedPatient.name} (Priority: ${lastArrivedPatient.priority})`,
        category: 'MEDICAL',
      });
    }
  }, [lastArrivedPatient]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return ctx;
}
