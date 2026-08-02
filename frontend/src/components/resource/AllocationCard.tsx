'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Layers } from 'lucide-react';

interface AllocationItem {
  id: string;
  resourceName: string;
  patientName: string;
  queueLength: number;
  durationMs: number;
  priority: string;
}

interface AllocationCardProps {
  allocations: AllocationItem[];
}

export function AllocationCard({ allocations }: AllocationCardProps) {
  return (
    <div className="card-os p-4 border border-border flex flex-col gap-4 font-mono text-xs">
      <div className="flex justify-between items-center pb-2 border-b border-border/60">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-primary" />
          <span className="font-bold text-text-primary uppercase">RESOURCE ALLOCATION PANEL</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-surface-elevated text-[9px] text-text-muted">
          LIVE RESOURCE LOCKS
        </span>
      </div>

      <div className="divide-y divide-border/30 max-h-[220px] overflow-y-auto pr-1">
        {allocations.length === 0 ? (
          <p className="text-[10px] text-text-muted text-center py-8">No active allocations currently held.</p>
        ) : (
          allocations.map((item) => (
            <div key={item.id} className="py-2.5 flex flex-col gap-1 first:pt-0">
              <div className="flex justify-between items-start gap-3">
                <span className="text-text-secondary font-semibold uppercase text-[10px] tracking-wide">
                  {item.resourceName}
                </span>
                <span className={cn(
                  "px-1.5 py-0.2 rounded text-[8px] font-bold border",
                  item.priority === 'HIGH' ? 'text-danger bg-danger/5 border-danger/20' :
                  item.priority === 'MEDIUM' ? 'text-warning bg-warning/5 border-warning/20' :
                  'text-success bg-success/5 border-success/20'
                )}>
                  {item.priority === 'HIGH' ? 'Emergency' : item.priority === 'MEDIUM' ? 'Critical' : 'Normal'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] text-text-muted mt-1">
                <div>Holder: <span className="text-text-primary font-semibold">{item.patientName}</span></div>
                <div>Queue Length: <span className="text-text-primary font-semibold">{item.queueLength} waiting</span></div>
                <div>Allocation Time: <span className="text-text-primary font-semibold">{Math.round(item.durationMs / 100) / 10}s</span></div>
                <div>Expected Release: <span className="text-text-primary font-semibold">T+{(Math.round(item.durationMs / 200) / 10)}s</span></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default AllocationCard;
