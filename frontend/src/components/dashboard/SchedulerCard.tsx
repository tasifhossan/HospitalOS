'use client';

import React from 'react';
import { Cpu, Zap, Activity } from 'lucide-react';
import { type SchedulerType } from '@/types/simulation';

interface SchedulerCardProps {
  algorithm: SchedulerType;
  efficiency: number;
  timeQuantum?: number;
  tickRate?: number;
}

export function SchedulerCard({ algorithm, efficiency }: SchedulerCardProps) {
  return (
    <div className="card-os p-4 border border-border flex flex-col gap-4 font-mono text-xs">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <Cpu className="w-4.5 h-4.5 text-primary" />
          <span className="font-bold text-text-primary">RESOURCE SCHEDULER</span>
        </div>
        <span className="px-2 py-0.5 rounded border border-primary/30 bg-primary/10 text-primary text-[10px] font-bold">
          ACTIVE
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-text-muted">Current Scheduler:</span>
          <span className="text-text-primary font-bold">Priority Scheduling</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">Secondary Scheduler:</span>
          <span className="text-text-primary">Multi-Level Queue</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">Registration Queue:</span>
          <span className="text-text-primary">FCFS</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">Doctor Consultation:</span>
          <span className="text-text-primary">Round Robin</span>
        </div>
        <div className="flex justify-between border-t border-border/30 pt-2">
          <span className="text-text-muted">DISPATCHER EFFICIENCY:</span>
          <span className="text-success font-bold">{efficiency}%</span>
        </div>
      </div>

      <div className="w-full bg-border/40 h-1.5 rounded overflow-hidden">
        <div
          className="bg-primary h-full transition-all duration-500"
          style={{ width: `${efficiency}%` }}
        />
      </div>
    </div>
  );
}
