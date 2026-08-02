'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Shield, Users, Bed, Activity, ShieldAlert } from 'lucide-react';

interface ResourceCardProps {
  name: string;
  available: number;
  allocated: number;
  waiting: number;
  utilization: number;
  status: 'Available' | 'Busy' | 'Critical' | 'Offline';
  onClick?: () => void;
}

const STATUS_CONFIGS = {
  Available: { color: 'text-success border-success/30 bg-success/5', dot: 'bg-success shadow-success/30' },
  Busy: { color: 'text-warning border-warning/30 bg-warning/5', dot: 'bg-warning shadow-warning/30' },
  Critical: { color: 'text-danger border-danger/30 bg-danger/5', dot: 'bg-danger shadow-danger/30' },
  Offline: { color: 'text-text-muted border-border bg-surface-elevated', dot: 'bg-text-muted shadow-border' },
};

export function ResourceCard({
  name,
  available,
  allocated,
  waiting,
  utilization,
  status,
  onClick,
}: ResourceCardProps) {
  const config = STATUS_CONFIGS[status] || STATUS_CONFIGS.Offline;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="card-os p-4 border border-border flex flex-col justify-between min-h-[140px] cursor-pointer shadow-sm relative overflow-hidden transition-all hover:border-primary/40"
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted">RESOURCE LOCK</span>
          <span className="text-sm font-bold text-text-primary font-mono mt-0.5">{name}</span>
        </div>
        <div className={cn("px-2 py-0.5 rounded border text-[9px] font-mono font-bold flex items-center gap-1.5", config.color)}>
          <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", config.dot)} />
          <span>{status.toUpperCase()}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4 text-[10px] font-mono">
        <div className="flex flex-col">
          <span className="text-text-muted text-[9px]">AVAILABLE</span>
          <span className="text-text-primary font-bold">{available}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-text-muted text-[9px]">ALLOCATED</span>
          <span className="text-text-primary font-bold">{allocated}</span>
        </div>
        <div className="flex flex-col col-span-1">
          <span className="text-text-muted text-[9px]">WAITING</span>
          <span className={cn("font-bold", waiting > 0 ? "text-warning" : "text-text-primary")}>
            {waiting}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-[9px] font-mono text-text-muted mb-1">
          <span>UTILIZATION</span>
          <span>{utilization}%</span>
        </div>
        <div className="w-full bg-border/40 h-1 rounded overflow-hidden">
          <div
            className={cn(
              "h-full transition-all duration-500",
              utilization > 85 ? "bg-danger" : utilization > 50 ? "bg-warning" : "bg-primary"
            )}
            style={{ width: `${utilization}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
export default ResourceCard;
