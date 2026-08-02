'use client';

import React, { useEffect, useState } from 'react';
import { Activity, ShieldCheck, Database, HardDrive, Cpu, AlertTriangle } from 'lucide-react';
import api from '@/lib/api';

interface SystemStatusCardProps {
  socketStatus: 'CONNECTED' | 'DISCONNECTED';
}

export function SystemStatusCard({ socketStatus }: SystemStatusCardProps) {
  const [dbStatus, setDbStatus] = useState<'ONLINE' | 'OFFLINE'>('ONLINE');
  const [apiLatency, setApiLatency] = useState<string>('...');

  // Periodic health check probe
  useEffect(() => {
    const runProbe = async () => {
      const start = Date.now();
      try {
        await api.get('/health');
        setApiLatency(`${Date.now() - start}ms`);
        setDbStatus('ONLINE');
      } catch {
        setDbStatus('OFFLINE');
        setApiLatency('Offline');
      }
    };
    runProbe();
    const interval = setInterval(runProbe, 10_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card-os p-5 border border-border space-y-4 font-mono text-xs">
      <div className="flex items-center gap-2 border-b border-border/60 pb-3">
        <Cpu className="w-4.5 h-4.5 text-primary" />
        <span className="font-bold text-text-primary uppercase tracking-wider">INFRASTRUCTURE TELEMETRY STATUS</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5">
        {/* API status */}
        <div className="p-3 border border-border rounded-lg bg-surface-elevated/15 flex flex-col justify-between min-h-[85px]">
          <div className="flex items-center gap-2 text-text-muted">
            <Activity className="w-4 h-4 text-primary" />
            <span className="font-bold text-[9px] uppercase">BACKEND API</span>
          </div>
          <div className="flex justify-between items-end mt-2">
            <span className="text-[10px] text-text-secondary">{apiLatency}</span>
            <span className="text-success font-bold text-[9px]">ONLINE</span>
          </div>
        </div>

        {/* Socket IO */}
        <div className="p-3 border border-border rounded-lg bg-surface-elevated/15 flex flex-col justify-between min-h-[85px]">
          <div className="flex items-center gap-2 text-text-muted">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <span className="font-bold text-[9px] uppercase">SOCKET.IO EVENT BUS</span>
          </div>
          <div className="flex justify-between items-end mt-2">
            <span className="text-[10px] text-text-secondary">WSS Layer</span>
            <span className={`font-bold text-[9px] ${socketStatus === 'CONNECTED' ? 'text-success' : 'text-danger'}`}>
              {socketStatus}
            </span>
          </div>
        </div>

        {/* Database */}
        <div className="p-3 border border-border rounded-lg bg-surface-elevated/15 flex flex-col justify-between min-h-[85px]">
          <div className="flex items-center gap-2 text-text-muted">
            <Database className="w-4 h-4 text-info" />
            <span className="font-bold text-[9px] uppercase">POSTGRES DB ENGINE</span>
          </div>
          <div className="flex justify-between items-end mt-2">
            <span className="text-[10px] text-text-secondary">Prisma Schema</span>
            <span className={`font-bold text-[9px] ${dbStatus === 'ONLINE' ? 'text-success' : 'text-danger'}`}>
              {dbStatus}
            </span>
          </div>
        </div>

        {/* Storage */}
        <div className="p-3 border border-border rounded-lg bg-surface-elevated/15 flex flex-col justify-between min-h-[85px]">
          <div className="flex items-center gap-2 text-text-muted">
            <HardDrive className="w-4 h-4 text-success" />
            <span className="font-bold text-[9px] uppercase">ENCRYPTED STORAGE</span>
          </div>
          <div className="flex justify-between items-end mt-2">
            <span className="text-[10px] text-text-secondary">Static Volumes</span>
            <span className="text-success font-bold text-[9px]">ONLINE</span>
          </div>
        </div>

        {/* Scheduler status */}
        <div className="p-3 border border-border rounded-lg bg-surface-elevated/15 flex flex-col justify-between min-h-[85px]">
          <div className="flex items-center gap-2 text-text-muted">
            <Cpu className="w-4 h-4 text-danger animate-pulse" />
            <span className="font-bold text-[9px] uppercase">SCHEDULER ENGINE</span>
          </div>
          <div className="flex justify-between items-end mt-2">
            <span className="text-[10px] text-text-secondary">Tick Driver</span>
            <span className="text-success font-bold text-[9px]">ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
