'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { type SimPatient } from '@/types/simulation';
import { Clock, ShieldAlert, Activity, CheckCircle2 } from 'lucide-react';

interface QueueCardProps {
  title: string;
  subtitle: string;
  patients: SimPatient[];
  status: 'Running' | 'Ready' | 'Waiting' | 'Completed';
}

export function QueueCard({ title, subtitle, patients, status }: QueueCardProps) {
  const statusConfig = {
    Running: { color: 'text-success border-success/30 bg-success/5', icon: Activity },
    Ready: { color: 'text-warning border-warning/30 bg-warning/5', icon: Clock },
    Waiting: { color: 'text-info border-info/30 bg-info/5', icon: ShieldAlert },
    Completed: { color: 'text-text-muted border-border bg-surface-elevated', icon: CheckCircle2 },
  }[status];

  const Icon = statusConfig.icon;

  return (
    <div className="card-os p-4 border border-border flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-xs font-bold font-mono uppercase text-text-primary">{title}</h4>
          <p className="text-[10px] text-text-muted mt-0.5">{subtitle}</p>
        </div>
        <div className={cn("px-2 py-0.5 rounded border text-[9px] font-mono font-bold flex items-center gap-1", statusConfig.color)}>
          <Icon className="w-3 h-3" />
          <span>{status.toUpperCase()}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[160px] divide-y divide-border/40 space-y-1.5 pr-1">
        {patients.length === 0 ? (
          <p className="text-[10px] text-text-muted text-center py-4 font-mono">Queue is empty</p>
        ) : (
          patients.map((p) => (
            <div key={p.id} className="flex justify-between items-center text-[10px] font-mono py-1.5 first:pt-0">
              <div className="flex flex-col">
                <span className="text-text-secondary font-semibold">{p.name}</span>
                <span className="text-[9px] text-text-muted">Arrival Tick: {p.arrivalTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={cn(
                  "px-1 py-0.2 rounded text-[8px] font-bold tracking-wider",
                  p.priority === 'HIGH' ? 'bg-danger/25 text-danger border border-danger/40' :
                  p.priority === 'MEDIUM' ? 'bg-warning/25 text-warning border border-warning/40' :
                  'bg-success/25 text-success border border-success/40'
                )}>
                  {p.priority === 'HIGH' ? 'Emergency' : p.priority === 'MEDIUM' ? 'Critical' : 'Normal'}
                </span>
                <span className="text-text-muted text-[9px]">{Math.round(p.treatmentDurationMs / 100) / 10}s</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
