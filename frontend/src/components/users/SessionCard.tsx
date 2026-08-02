'use client';

import React from 'react';
import { Monitor, Shield } from 'lucide-react';
import { RoleBadge } from './RoleBadge';

interface SessionCardProps {
  email: string;
  role: string;
  sessionStart: string;
  lastActivity: string;
  device: string;
  status: string;
}

export function SessionCard({
  email,
  role,
  sessionStart,
  lastActivity,
  device,
  status,
}: SessionCardProps) {
  return (
    <div className="p-3.5 rounded-lg border border-border bg-surface-elevated/10 hover:bg-surface-elevated/20 transition-all flex justify-between items-start font-mono text-xs gap-3">
      <div className="flex flex-col gap-2 min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-text-primary truncate" title={email}>{email}</span>
          <RoleBadge role={role as any} />
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[9px] text-text-muted mt-1">
          <div>
            <span className="block text-[8px] text-text-muted/65">SESSION START</span>
            <span className="text-text-secondary font-medium">{sessionStart}</span>
          </div>
          <div>
            <span className="block text-[8px] text-text-muted/65">LAST ACTIVITY</span>
            <span className="text-text-secondary font-medium">{lastActivity}</span>
          </div>
          <div className="col-span-2 mt-1 flex items-center gap-1">
            <Monitor className="w-3 h-3 text-text-muted/60" />
            <span className="truncate">{device}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 shrink-0">
        <span className="flex items-center gap-1 text-[9px] font-bold text-success">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-ping"></span>
          <span>{status}</span>
        </span>
        <span className="badge badge-warning text-[8px] scale-90 origin-right">
          TODO: REVOKE
        </span>
      </div>
    </div>
  );
}
