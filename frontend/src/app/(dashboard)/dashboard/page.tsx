'use client';

import React, { useEffect, useState } from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { useAuth } from '@/hooks/useAuth';
import { useSocket } from '@/hooks/useSocket';
import { useSystemStatus } from '@/contexts/SystemStatusContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { UnifiedDashboardLayout } from '@/components/layout/RoleLayouts';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { DashboardGrid } from '@/components/dashboard/DashboardGrid';
import { StatusCard } from '@/components/dashboard/StatusCard';
import { ActivityCard } from '@/components/dashboard/ActivityCard';
import { auditService } from '@/services/auditService';
import type { AuditLog } from '@/types/audit';
import {
  Shield,
  Activity,
  Users,
  Cpu,
  Clock,
  Bed,
  FileText,
  AlertTriangle,
  Stethoscope,
  Terminal,
  ArrowRight,
  HardDrive
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();
  const { isConnected, snapshot } = useSocket();
  const { cpuUsage, memoryUsage, health, schedulerStatus } = useSystemStatus();
  const { notifications } = useNotifications();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(true);

  // Fetch recent audit logs from API
  useEffect(() => {
    async function fetchLogs() {
      try {
        const data = await auditService.list({ limit: 5 });
        setLogs(data.logs);
      } catch (err) {
        console.error('Failed to load audit logs:', err);
      } finally {
        setLoadingLogs(false);
      }
    }
    fetchLogs();
  }, []);

  // Compute available counting semaphore resources from WebSocket resource state
  const getResourceAvailable = (type: string) => {
    if (!snapshot) return '—';
    const res = snapshot.resources.find((r) => r.type === type);
    return res ? `${res.available} / ${res.capacity}` : '—';
  };

  return (
    <UnifiedDashboardLayout>
      <PageShell
        title="Dashboard"
        subtitle="Adaptive Clinical Control & Resource Scheduling"
      >
        {/* Welcome Banner */}
        <div className="card-os p-6 border border-border relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-surface to-surface-elevated">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary-muted border border-primary-glow glow-primary flex-shrink-0">
              <Terminal className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-bold font-mono text-text-primary uppercase tracking-tight">
                HospitalOS Terminal Online
              </h2>
              <p className="text-xs text-text-secondary mt-1 leading-relaxed max-w-xl">
                Active Session Operator: <span className="text-text-primary font-semibold font-mono">{user?.email}</span>. 
                Synchronized with scheduling thread CPU bursts and secure patient file caches.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href="/system-monitor"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface-elevated hover:bg-surface-overlay text-[11px] font-mono font-medium text-text-secondary hover:text-text-primary transition-all"
            >
              <span>System Monitor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Live Kernel Variables Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <StatusCard
            label="SCHEDULER SERVICE"
            value={schedulerStatus === 'Running' ? 'RUNNING / ACTIVE' : 'STOPPED / INACTIVE'}
            status={schedulerStatus === 'Running' ? 'online' : 'offline'}
            description={`Tick: ${snapshot?.tick ?? 0}`}
          />
          <StatusCard
            label="SCHEDULING ALGORITHM"
            value={snapshot?.activeScheduler ?? 'FCFS (Default)'}
            status="info"
            description="Quantum: 100ms"
          />
          <StatusCard
            label="SYSTEM HEALTH INDEX"
            value={health.toUpperCase()}
            status={health === 'Healthy' ? 'online' : health === 'Warning' ? 'warning' : 'danger'}
            description={snapshot?.deadlockDetected ? 'DEADLOCK ACTIVE' : 'Healthy semaphores'}
          />
          <StatusCard
            label="CONNECTION TUNNEL"
            value={isConnected ? 'CONNECTED' : 'DISCONNECTED'}
            status={isConnected ? 'online' : 'offline'}
            description="Socket.io v4 client"
          />
        </div>

        {/* Executive Metrics Grid (10 concept cards) */}
        <h3 className="text-xs font-bold font-mono uppercase text-text-secondary tracking-wider mt-6 mb-3">
          SYSTEM THREADS & COUNTING SEMAPHORES
        </h3>
        <DashboardGrid>
          <MetricCard
            title="Running Processes"
            value={snapshot?.inTreatment.length ?? 0}
            icon={Activity}
            statusColor="success"
            statusText="Allocated"
            description="Patients currently in treatment threads"
          />
          <MetricCard
            title="Ready Queue"
            value={snapshot?.readyQueue.length ?? 0}
            icon={Clock}
            statusColor="warning"
            statusText="Waiting"
            description="Patients waiting for dispatcher scheduling"
          />
          <MetricCard
            title="Waiting Queue"
            value={snapshot?.stats.waiting ?? 0}
            icon={AlertTriangle}
            statusColor="danger"
            statusText="Waiting"
            description="Starvation-prevented wait queues"
          />
          <MetricCard
            title="Completed Processes"
            value={snapshot?.completed.length ?? 0}
            icon={FileText}
            statusColor="info"
            statusText="Completed"
            description="Successfully processed clinical discharge threads"
          />
          <MetricCard
            title="CPU Load"
            value={`${cpuUsage}%`}
            icon={Cpu}
            statusColor="primary"
            statusText="Current Status"
            description="Kernel scheduling cycle usage"
          />
          <MetricCard
            title="Memory Usage"
            value={`${memoryUsage}%`}
            icon={HardDrive}
            statusColor="primary"
            statusText="Current Status"
            description="Heap and clinical state cache buffer allocation"
          />
          <MetricCard
            title="Available Doctors"
            value={getResourceAvailable('DOCTOR')}
            icon={Stethoscope}
            statusColor="success"
            statusText="Available"
            description="Semaphore lock availability: DOCTOR"
          />
          <MetricCard
            title="Available ICU Beds"
            value={getResourceAvailable('ICU_BED')}
            icon={Bed}
            statusColor="danger"
            statusText="Available"
            description="Semaphore lock availability: ICU_BED"
          />
          <MetricCard
            title="Operation Theatres"
            value={getResourceAvailable('BED')}
            icon={Bed}
            statusColor="warning"
            statusText="Available"
            description="Semaphore lock availability: GENERAL_BED"
          />
          <MetricCard
            title="Available Nurses"
            value="—"
            icon={Users}
            statusColor="info"
            statusText="Available"
            description="Clinical staff observer pool allocations"
          />
        </DashboardGrid>

        {/* Bottom logs & activities panel split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Logs */}
          <ActivityCard logs={logs} loading={loadingLogs} />

          {/* Local notifications drawer */}
          <div className="card-os p-4 border border-border flex flex-col gap-4 font-mono text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-border/60">
              <span className="font-bold text-text-primary uppercase">RECENT ALERTS LOG</span>
              <span className="px-2 py-0.5 rounded bg-surface-elevated text-[9px] text-text-muted">
                LIVE BUS
              </span>
            </div>
            <div className="divide-y divide-border/30 max-h-[220px] overflow-y-auto pr-1 space-y-2">
              {notifications.length === 0 ? (
                <p className="text-[10px] text-text-muted text-center py-10">No recent alerts triggered.</p>
              ) : (
                notifications.slice(0, 4).map((notif) => (
                  <div key={notif.id} className="py-2 first:pt-0">
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-text-primary">{notif.title}</span>
                      <span className="text-[8px] bg-surface-elevated px-1.5 py-0.2 rounded border border-border">
                        {notif.category}
                      </span>
                    </div>
                    <p className="text-text-muted text-[11px] mt-1">{notif.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Phase 4 Placeholders Row */}
        <h3 className="text-xs font-bold font-mono uppercase text-text-secondary tracking-wider mt-6 mb-3">
          PHASE 4 ADVANCED TELEMETRY (PREVIEW)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card-os p-5 border border-border/80 flex flex-col items-center justify-center text-center min-h-[160px] bg-surface/30 border-dashed">
            <div className="text-text-muted font-mono text-xs uppercase font-bold mb-1">
              Resource Allocation Chart
            </div>
            <p className="text-[10px] text-text-muted max-w-xs leading-relaxed">
              Allocated vs. requested Clinical Semaphores (doctors, general beds, ICU rooms) thread wait states visualizer. Coming in Phase 4.
            </p>
          </div>

          <div className="card-os p-5 border border-border/80 flex flex-col items-center justify-center text-center min-h-[160px] bg-surface/30 border-dashed">
            <div className="text-text-muted font-mono text-xs uppercase font-bold mb-1">
              File Protection Status
            </div>
            <p className="text-[10px] text-text-muted max-w-xs leading-relaxed">
              AES-256 CTR file integrity verifier & tamper audit tracking. Access privileges ring violation detector. Coming in Phase 4.
            </p>
          </div>
        </div>
      </PageShell>
    </UnifiedDashboardLayout>
  );
}
