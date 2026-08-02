'use client';

import React from 'react';
import { ShieldCheck, AlertOctagon, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DeadlockStatusCardProps {
  isSafe: boolean;
  cycle?: string[];
  preventedAllocationCount: number;
}

export function DeadlockStatusCard({ isSafe, cycle, preventedAllocationCount }: DeadlockStatusCardProps) {
  return (
    <div className="card-os p-4 border border-border flex flex-col gap-4 font-mono text-xs">
      <div className="flex justify-between items-center pb-2 border-b border-border/60">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4.5 h-4.5 text-success" />
          <span className="font-bold text-text-primary uppercase">DEADLOCK PREVENTION STATUS</span>
        </div>
        <span className={cn(
          "px-2 py-0.5 rounded border text-[9px] font-bold",
          isSafe ? "text-success border-success/20 bg-success/5" : "text-danger border-danger/20 bg-danger/5"
        )}>
          {isSafe ? 'SYSTEM SAFE' : 'POTENTIAL CONFLICT'}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-3 bg-surface-elevated/40 p-3 rounded-lg border border-border/40">
          {isSafe ? (
            <ShieldCheck className="w-8 h-8 text-success flex-shrink-0" />
          ) : (
            <AlertOctagon className="w-8 h-8 text-danger flex-shrink-0" />
          )}
          <div>
            <h5 className="font-semibold text-text-primary">
              {isSafe ? 'System Safety Verified' : 'Circular Wait Warning'}
            </h5>
            <p className="text-[10px] text-text-muted mt-1 leading-relaxed">
              {isSafe 
                ? 'Clinical resource allocations evaluated against maximum demands. System order holds no circular wait conditions.'
                : 'Directed graph evaluation detected potential cycles in wait-for patient requests.'}
            </p>
          </div>
        </div>

        <div className="space-y-2 mt-2">
          <div className="flex justify-between">
            <span className="text-text-muted">No Circular Waiting:</span>
            <span className="text-success font-bold">ENABLED</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Prevented Allocations (Total):</span>
            <span className="text-text-primary font-bold">{preventedAllocationCount} requests</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Allocation Order Verification:</span>
            <span className="text-primary font-bold">SAFE ORDER APPROVED</span>
          </div>
        </div>

        {cycle && cycle.length > 0 && (
          <div className="mt-2 p-2 bg-danger/10 border border-danger/20 rounded text-[9px] text-danger">
            <span className="font-bold">Detected Conflict Arc:</span> {cycle.join(' → ')}
          </div>
        )}
      </div>
    </div>
  );
}
export default DeadlockStatusCard;
