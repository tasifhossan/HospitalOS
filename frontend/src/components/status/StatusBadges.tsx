'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Cpu, Wifi, WifiOff, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { SchedulerRunningStatus, SystemHealthStatus } from '@/contexts/SystemStatusContext';

// ─── Scheduler Running Badge ────────────────────────────────────────────────
interface SchedulerBadgeProps {
  status: SchedulerRunningStatus;
  algorithm?: string;
}

export function SchedulerBadge({ status, algorithm }: SchedulerBadgeProps) {
  const config = {
    Running: { label: 'Scheduler Running', color: 'text-success bg-success/10 border-success/30', pulse: 'online' },
    Paused: { label: 'Scheduler Paused', color: 'text-warning bg-warning/10 border-warning/30', pulse: 'warning' },
    Stopped: { label: 'Scheduler Stopped', color: 'text-danger bg-danger/10 border-danger/30', pulse: 'danger' },
  }[status];

  return (
    <div className={cn("inline-flex items-center gap-2 px-2.5 py-1 rounded-md border text-xs font-mono font-medium", config.color)}>
      <span className={cn("status-dot", config.pulse)} />
      <Cpu className="w-3.5 h-3.5" />
      <span>{config.label} {algorithm ? `(${algorithm})` : ''}</span>
    </div>
  );
}

// ─── Socket Connection Badge ────────────────────────────────────────────────
interface ConnectionBadgeProps {
  isConnected: boolean;
  isReconnecting?: boolean;
}

export function ConnectionBadge({ isConnected, isReconnecting }: ConnectionBadgeProps) {
  if (isReconnecting) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-warning/30 bg-warning/10 text-warning text-xs font-mono font-medium">
        <RefreshCw className="w-3 h-3 animate-spin" />
        <span>Reconnecting</span>
      </div>
    );
  }

  if (isConnected) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-success/30 bg-success/10 text-success text-xs font-mono font-medium">
        <Wifi className="w-3 h-3" />
        <span>Connected</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-danger/30 bg-danger/10 text-danger text-xs font-mono font-medium">
      <WifiOff className="w-3 h-3" />
      <span>Disconnected</span>
    </div>
  );
}

// ─── System Health Status Badge ─────────────────────────────────────────────
interface HealthBadgeProps {
  status: SystemHealthStatus;
}

export function HealthBadge({ status }: HealthBadgeProps) {
  const config = {
    Healthy: { label: 'Healthy', color: 'text-success bg-success/10 border-success/30' },
    Warning: { label: 'Warning', color: 'text-warning bg-warning/10 border-warning/30' },
    Critical: { label: 'Critical', color: 'text-danger bg-danger/10 border-danger/30 animate-pulse' },
  }[status];

  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-mono font-medium", config.color)}>
      <AlertTriangle className="w-3.5 h-3.5" />
      <span>OS Kernel: {config.label}</span>
    </div>
  );
}

// ─── Role Privilege Badge ───────────────────────────────────────────────────
interface RoleBadgeProps {
  role: string;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  const colors: Record<string, string> = {
    ADMIN: 'text-danger bg-danger/10 border-danger/30',
    DOCTOR: 'text-primary bg-primary/10 border-primary/30',
    NURSE: 'text-success bg-success/10 border-success/30',
    RECEPTIONIST: 'text-warning bg-warning/10 border-warning/30',
    PATIENT: 'text-info bg-info/10 border-info/30',
  };

  return (
    <div className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] font-mono font-semibold tracking-wider uppercase", colors[role] ?? 'text-muted border-border')}>
      <ShieldCheck className="w-3 h-3" />
      <span>{role}</span>
    </div>
  );
}
