'use client';

import React from 'react';
import { X, Shield, Activity, HardDrive, Check, Users } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { type SimPatient } from '@/types/simulation';

interface ResourceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  resource: {
    id: string;
    name: string;
    type: string;
    capacity: number;
    allocated: number;
    available: number;
    waiting: number;
    utilization: number;
    status: string;
  } | null;
  waitingQueue: SimPatient[];
}

export function ResourceDrawer({ isOpen, onClose, resource, waitingQueue }: ResourceDrawerProps) {
  if (!isOpen || !resource) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black"
        />

        {/* Drawer content */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md h-full bg-surface border-l border-border flex flex-col shadow-2xl z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs font-bold text-text-primary uppercase">
                RESOURCE LOCK DETAILS: {resource.name}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-surface-elevated text-text-muted hover:text-text-primary transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 font-mono text-xs">
            {/* Variables block */}
            <div className="card-os p-4 border border-border space-y-3">
              <div className="text-[10px] text-text-muted uppercase font-bold border-b border-border pb-1">
                Resource Lock State
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-[9px] text-text-muted">MAX ALLOCATION LIMIT</span>
                  <span className="text-sm font-bold text-text-primary">{resource.capacity} units</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-text-muted">HELD / ALLOCATED</span>
                  <span className="text-sm font-bold text-primary">{resource.allocated} units</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-text-muted">AVAILABLE LOCKS</span>
                  <span className="text-sm font-bold text-success">{resource.available} units</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-text-muted">UTILIZATION INDEX</span>
                  <span className="text-sm font-bold text-warning">{resource.utilization}%</span>
                </div>
              </div>
            </div>

            {/* Waiting Queue */}
            <div className="space-y-2">
              <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider">
                Waiting Queue ({waitingQueue.length})
              </div>
              <div className="card-os border border-border divide-y divide-border/40 max-h-[180px] overflow-y-auto">
                {waitingQueue.length === 0 ? (
                  <p className="text-[10px] text-text-muted text-center py-6">No patient requests waiting for this resource lock.</p>
                ) : (
                  waitingQueue.map((p) => (
                    <div key={p.id} className="p-3 flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="font-semibold text-text-primary">{p.name}</span>
                        <span className="text-[9px] text-text-muted">Arrival Tick: {p.arrivalTime}</span>
                      </div>
                      <span className="text-[8px] font-bold border border-warning/20 bg-warning/5 text-warning px-1.5 py-0.5 rounded">
                        {p.priority}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Allocations mock/telemetry logs */}
            <div className="space-y-2">
              <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider">
                Resource Lock Transaction Logs
              </div>
              <div className="card-os p-4 border border-border divide-y divide-border/30 max-h-[200px] overflow-y-auto space-y-1.5">
                <div className="flex items-center justify-between text-[10px] py-1.5">
                  <div className="flex items-center gap-1.5 text-success">
                    <Check className="w-3.5 h-3.5" />
                    <span>Resource Allocated</span>
                  </div>
                  <span className="text-[9px] text-text-muted">1m ago</span>
                </div>
                <div className="flex items-center justify-between text-[10px] py-1.5">
                  <div className="flex items-center gap-1.5 text-primary">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Resource Lock Released</span>
                  </div>
                  <span className="text-[9px] text-text-muted">3m ago</span>
                </div>
                <div className="flex items-center justify-between text-[10px] py-1.5">
                  <div className="flex items-center gap-1.5 text-text-muted">
                    <X className="w-3.5 h-3.5" />
                    <span>Lock Timed Out</span>
                  </div>
                  <span className="text-[9px] text-text-muted">5m ago</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
export default ResourceDrawer;
