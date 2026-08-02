'use client';

import React from 'react';
import { Sliders, HelpCircle } from 'lucide-react';

interface ConfigurationCardProps {
  tickIntervalMs: number;
}

export function ConfigurationCard({ tickIntervalMs }: ConfigurationCardProps) {
  return (
    <div className="card-os p-5 border border-border space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4.5 h-4.5 text-primary" />
          <span className="font-bold text-text-primary uppercase tracking-wider">KERNEL CONFIGURATION REGISTER</span>
        </div>
        <span className="badge badge-warning text-[9px]">
          Read-Only
        </span>
      </div>

      <div className="space-y-4">
        {/* Timing Configuration parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
          <div className="p-3 border border-border/60 rounded-lg bg-surface-elevated/10">
            <span className="text-[8px] text-text-muted block uppercase">Scheduler Tick Interval</span>
            <span className="text-text-primary font-bold text-xs mt-1 block">{tickIntervalMs} ms</span>
          </div>
          <div className="p-3 border border-border/60 rounded-lg bg-surface-elevated/10">
            <span className="text-[8px] text-text-muted block uppercase">Client Refresh Interval</span>
            <span className="text-text-primary font-bold text-xs mt-1 block">Live (Socket Driven)</span>
          </div>
          <div className="p-3 border border-border/60 rounded-lg bg-surface-elevated/10">
            <span className="text-[8px] text-text-muted block uppercase">Realtime Notifications</span>
            <span className="text-success font-bold text-xs mt-1 block">ENABLED</span>
          </div>
          <div className="p-3 border border-border/60 rounded-lg bg-surface-elevated/10">
            <span className="text-[8px] text-text-muted block uppercase">Maintenance Isolation Mode</span>
            <span className="text-danger font-bold text-xs mt-1 block">DISABLED</span>
          </div>
        </div>

        {/* Config Edit Form Wrapper (Locked by backend unavailable) */}
        <div className="border-t border-border/40 pt-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-text-primary text-[9px] uppercase">Update Config Register</span>
            <span className="badge badge-warning text-[8px] scale-90">
              Pending Backend Support
            </span>
          </div>
          <fieldset disabled className="grid grid-cols-1 sm:grid-cols-2 gap-3 opacity-60">
            <div className="flex flex-col gap-1">
              <label className="text-[8px] text-text-muted">Simulated Tick Time (ms)</label>
              <input
                type="number"
                placeholder="1000"
                className="bg-surface-elevated border border-border p-2 rounded outline-none text-text-primary text-xs"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[8px] text-text-muted">Max Thread Ready Lifespan</label>
              <input
                type="number"
                placeholder="60000"
                className="bg-surface-elevated border border-border p-2 rounded outline-none text-text-primary text-xs"
              />
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
}
