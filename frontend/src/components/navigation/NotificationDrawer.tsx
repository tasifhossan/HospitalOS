'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useNotifications, type NotificationItem, type NotificationCategory } from '@/contexts/NotificationContext';
import { Bell, ShieldAlert, Cpu, HeartPulse, HardDrive, ShieldCheck, X, Check, Trash, Lock, Brain, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

const CATEGORY_ICONS: Record<NotificationCategory, React.ElementType> = {
  SYSTEM: HardDrive,
  SCHEDULER: Cpu,
  MEMORY: Brain,
  RESOURCE: Cpu,
  MEDICAL: HeartPulse,
  FILE_PROTECTION: Lock,
  DEADLOCK_PREVENTION: ShieldAlert,
  USER_MANAGEMENT: User,
  SECURITY: ShieldCheck,
};

const CATEGORY_COLORS: Record<NotificationCategory, string> = {
  SYSTEM: 'text-info bg-info/10 border-info/20',
  SCHEDULER: 'text-primary bg-primary/10 border-primary/20',
  MEMORY: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  RESOURCE: 'text-warning bg-warning/10 border-warning/20',
  MEDICAL: 'text-success bg-success/10 border-success/20',
  FILE_PROTECTION: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  DEADLOCK_PREVENTION: 'text-danger bg-danger/10 border-danger/20',
  USER_MANAGEMENT: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  SECURITY: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
};

export function NotificationDrawer() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={drawerRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative p-2 rounded-lg hover:bg-surface-overlay text-text-secondary hover:text-text-primary transition-colors"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger animate-pulse" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="absolute right-0 mt-2 w-80 max-h-[420px] rounded-lg border border-border bg-surface shadow-2xl z-50 flex flex-col font-mono text-xs overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-background">
              <span className="font-semibold text-text-primary">NOTIFICATIONS ({unreadCount})</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={markAllAsRead}
                  className="p-1 rounded hover:bg-surface-overlay text-text-muted hover:text-text-primary"
                  title="Mark all as read"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={clearNotifications}
                  className="p-1 rounded hover:bg-surface-overlay text-text-muted hover:text-text-primary"
                  title="Clear all"
                >
                  <Trash className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded hover:bg-surface-overlay text-text-muted hover:text-text-primary"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto divide-y divide-border max-h-[300px]">
              {notifications.length === 0 ? (
                <div className="py-8 text-center text-text-muted">
                  No active logs/alerts.
                </div>
              ) : (
                notifications.map((notif) => {
                  const Icon = CATEGORY_ICONS[notif.category] || HardDrive;
                  const colorClass = CATEGORY_COLORS[notif.category];

                  return (
                    <div
                      key={notif.id}
                      className={`p-3 transition-colors ${notif.read ? 'opacity-60 bg-transparent' : 'bg-surface-elevated'}`}
                      onClick={() => markAsRead(notif.id)}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={`p-1.5 rounded border flex-shrink-0 ${colorClass}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-text-primary truncate">{notif.title}</p>
                          <p className="text-[11px] text-text-secondary mt-0.5 leading-relaxed">{notif.message}</p>
                          <p className="text-[9px] text-text-muted mt-1">
                            {formatDistanceToNow(new Date(notif.timestamp), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
