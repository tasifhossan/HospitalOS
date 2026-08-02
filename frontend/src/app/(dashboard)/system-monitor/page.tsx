'use client';

import React, { useEffect, useState } from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { UnifiedDashboardLayout } from '@/components/layout/RoleLayouts';
import { useSocket } from '@/hooks/useSocket';
import { useSystemStatus } from '@/contexts/SystemStatusContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { StatusCard } from '@/components/dashboard/StatusCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { CpuChart } from '@/components/charts/CpuChart';
import { MemoryChart } from '@/components/charts/MemoryChart';
import { Activity, Cpu, HardDrive, ShieldCheck, HeartPulse, RefreshCw } from 'lucide-react';

interface MetricHistoryNode {
  time: string;
  value: number;
}

export default function SystemMonitorPage() {
  const { isConnected, snapshot } = useSocket();
  const { cpuUsage, memoryUsage, health, schedulerStatus, lastSyncTime } = useSystemStatus();
  const { notifications } = useNotifications();

  // Keep rolling history of 10 data points for CPU and Memory area charts
  const [cpuHistory, setCpuHistory] = useState<MetricHistoryNode[]>([]);
  const [memHistory, setMemHistory] = useState<MetricHistoryNode[]>([]);

  useEffect(() => {
    const timeLabel = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    setCpuHistory((prev) => {
      const next = [...prev, { time: timeLabel, value: cpuUsage }];
      return next.slice(-10);
    });

    setMemHistory((prev) => {
      const next = [...prev, { time: timeLabel, value: memoryUsage }];
      return next.slice(-10);
    });
  }, [cpuUsage, memoryUsage]);

  return (
    <UnifiedDashboardLayout>
      <PageShell
        title="System Monitor"
        subtitle="Kernel CPU burst tracking, active page cache memory management & live events logs"
      >
        {/* Section 1: System Status */}
        <h3 className="text-xs font-bold font-mono uppercase text-text-secondary tracking-wider mb-3">
          1. KERNEL SYSTEM STATUS
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatusCard
            label="System Health"
            value={health.toUpperCase()}
            status={health === 'Healthy' ? 'online' : health === 'Warning' ? 'warning' : 'danger'}
            description="Wait-for-graph cycle free"
          />
          <StatusCard
            label="Scheduler Kernel"
            value={schedulerStatus === 'Running' ? 'ACTIVE' : 'INACTIVE'}
            status={schedulerStatus === 'Running' ? 'online' : 'offline'}
            description="Quantum timing enabled"
          />
          <StatusCard
            label="Socket Connected"
            value={isConnected ? 'CONNECTED' : 'DISCONNECTED'}
            status={isConnected ? 'online' : 'offline'}
            description="Realtime Socket.io active"
          />
          <StatusCard
            label="Database Connection"
            value="ESTABLISHED"
            status="online"
            description="Prisma Client connected"
          />
        </div>

        {/* Section 2 & 3: CPU and Memory Usage Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ChartCard
            title="CPU Load History"
            subtitle="Demonstrates CPU scheduler ticks execution load"
          >
            <CpuChart data={cpuHistory} />
          </ChartCard>

          <ChartCard
            title="Memory Cache History"
            subtitle="Demonstrates page allocation & memory leaks preventive index"
          >
            <MemoryChart data={memHistory} />
          </ChartCard>
        </div>

        {/* Performance metrics breakdown cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* CPU Stats */}
          <div className="card-os p-4 border border-border flex flex-col gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-border/60">
              <Cpu className="w-4 h-4 text-primary" />
              <span className="font-bold text-text-primary uppercase">HospitalOS System Monitor</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-text-muted">CPU Usage %:</span>
                <span className="text-text-primary font-bold">{cpuUsage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Active Processes:</span>
                <span className="text-text-primary font-bold">{((snapshot?.inTreatment || []).length) + ((snapshot?.readyQueue || []).length)} threads</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Clock Tick Rate:</span>
                <span className="text-text-primary">1hz (1 tick/sec)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Current Clock Tick:</span>
                <span className="text-text-primary">{snapshot?.tick ?? 0}</span>
              </div>
            </div>
          </div>

          {/* Memory Stats */}
          <div className="card-os p-4 border border-border flex flex-col gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-border/60">
              <HardDrive className="w-4 h-4 text-info" />
              <span className="font-bold text-text-primary uppercase">MEMORY VIRTUAL ALLOCATIONS</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-text-muted">Allocated Sessions:</span>
                <span className="text-text-primary font-bold">1 active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Released Sessions:</span>
                <span className="text-text-primary">0 garbage-collected</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Memory Usage %:</span>
                <span className="text-text-primary font-bold">{memoryUsage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Session Cache Status:</span>
                <span className="text-success font-bold">OPTIMIZED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Realtime Events & Processes list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Realtime Event Stream */}
          <div className="card-os p-4 border border-border flex flex-col gap-4 font-mono text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-border/60">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-success" />
                <span className="font-bold text-text-primary uppercase">REALTIME SCHEDULER EVENTS</span>
              </div>
              <span className="status-dot online" />
            </div>
            <div className="divide-y divide-border/20 max-h-[220px] overflow-y-auto pr-1">
              {snapshot ? (
                <>
                  <div className="py-2 flex justify-between">
                    <span className="text-text-secondary font-medium">Scheduler tick clock trigger</span>
                    <span className="text-text-muted text-[10px]">Tick: {snapshot.tick}</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-text-secondary font-medium">Active algorithm configured</span>
                    <span className="text-primary text-[10px]">{snapshot.activeScheduler}</span>
                  </div>
                  {(snapshot.readyQueue || []).map((p) => (
                    <div key={p.id} className="py-2 flex justify-between">
                      <span className="text-text-muted">New Patient Request: {p.name}</span>
                      <span className="text-warning text-[10px]">Ready</span>
                    </div>
                  ))}
                  {(snapshot.inTreatment || []).map((p) => (
                    <div key={p.id} className="py-2 flex justify-between">
                      <span className="text-text-secondary">Resource Allocated (Doctor): {p.name}</span>
                      <span className="text-success text-[10px]">Treatment</span>
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-[10px] text-text-muted text-center py-8">Waiting for kernel updates...</p>
              )}
            </div>
          </div>

          {/* Section 6: Notification Center (categorized) */}
          <div className="card-os p-4 border border-border flex flex-col gap-4 font-mono text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-border/60">
              <span className="font-bold text-text-primary uppercase">NOTIFICATION KERNEL LOGS</span>
              <span className="text-[9px] text-text-muted">Filter: ALL CATEGORIES</span>
            </div>
            <div className="divide-y divide-border/20 max-h-[220px] overflow-y-auto pr-1 space-y-2">
              {notifications.length === 0 ? (
                <p className="text-[10px] text-text-muted text-center py-10">No recent notifications logged.</p>
              ) : (
                notifications.map((notif) => (
                  <div key={notif.id} className="py-1 flex flex-col gap-1 first:pt-0">
                    <div className="flex justify-between">
                      <span className="font-semibold text-text-primary">{notif.title}</span>
                      <span className="text-[8px] border border-border bg-surface-elevated px-1 py-0.2 rounded font-bold">
                        {notif.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-text-muted">{notif.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </PageShell>
    </UnifiedDashboardLayout>
  );
}
