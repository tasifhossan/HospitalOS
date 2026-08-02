'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface StatusCardProps {
  label: string;
  value: string;
  status: 'online' | 'offline' | 'warning' | 'danger' | 'info';
  description?: string;
}

export function StatusCard({ label, value, status, description }: StatusCardProps) {
  const dotClasses = {
    online: 'bg-success shadow-success/30',
    offline: 'bg-text-muted shadow-border',
    warning: 'bg-warning shadow-warning/30',
    danger: 'bg-danger shadow-danger/30',
    info: 'bg-info shadow-info/30',
  }[status];

  return (
    <div className="card-os p-4 border border-border flex items-center justify-between gap-4 font-mono text-xs">
      <div className="flex items-center gap-3">
        <span className={cn("w-2.5 h-2.5 rounded-full animate-pulse shadow-sm", dotClasses)} />
        <div className="flex flex-col">
          <span className="text-text-muted uppercase text-[10px]">{label}</span>
          <span className="text-text-primary font-bold mt-0.5">{value}</span>
        </div>
      </div>
      {description && (
        <span className="text-[10px] text-text-muted max-w-[120px] text-right truncate">
          {description}
        </span>
      )}
    </div>
  );
}
