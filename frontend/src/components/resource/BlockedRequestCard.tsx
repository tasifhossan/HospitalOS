'use client';

import React from 'react';
import { ShieldAlert, Hourglass } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlockedItem {
  id: string;
  patientName: string;
  requiredResource: string;
  priority: string;
  waitingTicks: number;
  reason: string;
}

interface BlockedRequestCardProps {
  blockedRequests: BlockedItem[];
}

export function BlockedRequestCard({ blockedRequests }: BlockedRequestCardProps) {
  return (
    <div className="card-os p-4 border border-border flex flex-col gap-4 font-mono text-xs">
      <div className="flex justify-between items-center pb-2 border-b border-border/60">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-warning" />
          <span className="font-bold text-text-primary uppercase">BLOCKED PATIENT REQUESTS / RESOURCE LOCK QUEUES</span>
        </div>
        <span className="px-2 py-0.5 rounded border border-warning/30 bg-warning/5 text-warning text-[9px] font-bold">
          WAIT STATE
        </span>
      </div>

      <div className="divide-y divide-border/30 max-h-[220px] overflow-y-auto pr-1">
        {blockedRequests.length === 0 ? (
          <p className="text-[10px] text-text-muted text-center py-8">No patient requests currently blocked waiting on resource locks.</p>
        ) : (
          blockedRequests.map((item) => (
            <div key={item.id} className="py-2.5 flex flex-col gap-1 first:pt-0">
              <div className="flex justify-between items-start gap-3">
                <span className="text-text-secondary font-semibold uppercase text-[10px] tracking-wide">
                  Process: {item.patientName}
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
              <div className="text-[10px] text-text-muted mt-1 space-y-1">
                <div>Required Resource: <span className="text-text-primary font-semibold">{item.requiredResource}</span></div>
                <div className="flex items-center gap-1.5">
                  <Hourglass className="w-3.5 h-3.5 text-warning" />
                  <span>Waiting Duration: <span className="text-text-primary font-semibold">{item.waitingTicks} ticks</span></span>
                </div>
                <div className="text-[9px] text-warning/80">Reason: {item.reason}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default BlockedRequestCard;
