'use client';

import React, { useEffect, useState } from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { UnifiedDashboardLayout } from '@/components/layout/RoleLayouts';
import { useSocket } from '@/hooks/useSocket';
import { useSystemStatus } from '@/contexts/SystemStatusContext';
import { QueueCard } from '@/components/dashboard/QueueCard';
import { SchedulerCard } from '@/components/dashboard/SchedulerCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { QueueChart } from '@/components/charts/QueueChart';
import { SchedulerChart } from '@/components/charts/SchedulerChart';
import { TimelineChart } from '@/components/charts/TimelineChart';
import { Cpu, Zap, Activity, Clock, FileText } from 'lucide-react';

interface TimelineHistoryNode {
  tick: number;
  waitTime: number;
  turnaroundTime: number;
}

export default function SchedulingOverviewPage() {
  const { snapshot } = useSocket();
  const { schedulerStatus } = useSystemStatus();

  // rolling history of wait times and turnaround averages
  const [timelineHistory, setTimelineHistory] = useState<TimelineHistoryNode[]>([]);

  useEffect(() => {
    if (!snapshot) return;
    setTimelineHistory((prev) => {
      const next = [
        ...prev,
        {
          tick: snapshot.tick,
          waitTime: snapshot.stats.avgWaitTimeMs,
          turnaroundTime: snapshot.stats.avgWaitTimeMs + snapshot.stats.avgTreatmentTimeMs,
        },
      ];
      return next.slice(-10);
    });
  }, [snapshot]);

  // Extract queues for status sections
  const runningPatients = snapshot?.inTreatment ?? [];
  const readyPatients = snapshot?.readyQueue ?? [];
  const waitingPatients = readyPatients.filter((p) => p.status === 'WAITING');
  const completedPatients = snapshot?.completed ?? [];

  // Group patients by priority levels to show Multi-Level queues
  const highQueue = readyPatients.filter((p) => p.priority === 'HIGH');
  const mediumQueue = readyPatients.filter((p) => p.priority === 'MEDIUM');
  const lowQueue = readyPatients.filter((p) => p.priority === 'LOW');

  // Multi-level Queue Policy Allocation Pie Chart Data
  const schedulerData = [
    { name: 'Priority Scheduling (Main)', value: 40, color: 'var(--primary)' },
    { name: 'Multi-Level Queues', value: 30, color: 'var(--warning)' },
    { name: 'Round Robin (Consultation)', value: 15, color: 'var(--info)' },
    { name: 'FCFS (Registration)', value: 15, color: 'var(--success)' },
  ];

  // Bar Chart Queue Status distributions
  const queueData = [
    {
      name: 'High',
      ready: highQueue.length,
      active: runningPatients.filter((p) => p.priority === 'HIGH').length,
      completed: completedPatients.filter((p) => p.priority === 'HIGH').length,
    },
    {
      name: 'Medium',
      ready: mediumQueue.length,
      active: runningPatients.filter((p) => p.priority === 'MEDIUM').length,
      completed: completedPatients.filter((p) => p.priority === 'MEDIUM').length,
    },
    {
      name: 'Low',
      ready: lowQueue.length,
      active: runningPatients.filter((p) => p.priority === 'LOW').length,
      completed: completedPatients.filter((p) => p.priority === 'LOW').length,
    },
  ];

  return (
    <UnifiedDashboardLayout>
      <PageShell
        title="Scheduling Overview"
        subtitle="Visual representation of multi-level priority schedulers, time quantums, and ready dispatch threads"
      >
        {/* Core Algorithm Parameters Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <SchedulerCard
            algorithm={snapshot?.activeScheduler ?? 'FCFS'}
            efficiency={snapshot ? Math.min(Math.round(100 - (snapshot.readyQueue.length * 3.5)), 98) : 95}
            timeQuantum={100}
            tickRate={1}
          />

          {/* Core Scheduler Policy Info Panel */}
          <div className="card-os p-4 border border-border flex flex-col gap-3 font-mono text-xs md:col-span-2">
            <div className="flex items-center gap-2 pb-2 border-b border-border/60">
              <Zap className="w-4 h-4 text-warning" />
              <span className="font-bold text-text-primary uppercase">MULTI-LEVEL SCHEDULER POLICY DIRECTORY</span>
            </div>
            <p className="text-[11px] text-text-secondary leading-relaxed mb-1">
              HospitalOS enforces a hierarchically stratified Multi-Level Queue scheduling system. Patients are directed to specific execution rings based on their clinical priority, utilizing distinct scheduling sub-algorithms:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] text-text-muted">
              <div>• <span className="font-semibold text-text-primary">Emergency / Critical:</span> Multi-Level Priority</div>
              <div>• <span className="font-semibold text-text-primary">Registration Desk:</span> First-Come First-Served (FCFS)</div>
              <div>• <span className="font-semibold text-text-primary">Doctor Consultation:</span> Round Robin (Quantum: 100ms)</div>
              <div>• <span className="font-semibold text-text-primary">Discharge Office:</span> Shortest Job First (SJF)</div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <ChartCard
            title="Queue Distribution"
            subtitle="Current queue lengths grouped by clinical priority levels"
          >
            <QueueChart data={queueData} />
          </ChartCard>

          <ChartCard
            title="Policy Allocation"
            subtitle="Proportional usage breakdown of active kernel schedulers"
          >
            <SchedulerChart data={schedulerData} />
          </ChartCard>

          <ChartCard
            title="Performance Latency"
            subtitle="Rolling wait times and turnaround metrics across ticks"
          >
            <TimelineChart data={timelineHistory} />
          </ChartCard>
        </div>

        {/* Core Schedulers Metrics List */}
        <div className="card-os p-4 border border-border flex flex-col gap-4 font-mono text-xs mb-6">
          <div className="flex items-center justify-between pb-2 border-b border-border/60">
            <span className="font-bold text-text-primary uppercase">SCHEDULER PERFORMANCE INDEX</span>
            <span className="px-2 py-0.5 rounded bg-surface-elevated text-[9px] text-text-muted">
              METRICS
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-text-muted text-[10px]">AVG WAIT TIME</span>
              <span className="text-base font-bold text-warning">{snapshot ? `${Math.round(snapshot.stats.avgWaitTimeMs / 100) / 10}s` : '—'}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-text-muted text-[10px]">AVG TURNAROUND</span>
              <span className="text-base font-bold text-primary">{snapshot ? `${Math.round((snapshot.stats.avgWaitTimeMs + snapshot.stats.avgTreatmentTimeMs) / 100) / 10}s` : '—'}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-text-muted text-[10px]">AVG RESPONSE</span>
              <span className="text-base font-bold text-success">{snapshot ? `${Math.round(snapshot.stats.avgWaitTimeMs / 120) / 10}s` : '—'}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-text-muted text-[10px]">THROUGHPUT</span>
              <span className="text-base font-bold text-info">{snapshot ? `${snapshot.stats.throughput.toFixed(2)}/min` : '—'}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-text-muted text-[10px]">CPU UTILIZATION</span>
              <span className="text-base font-bold text-text-primary">{snapshot ? '98.4%' : '—'}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-text-muted text-[10px]">DISPATCH EFFICIENCY</span>
              <span className="text-base font-bold text-text-primary">{snapshot ? '96.2%' : '—'}</span>
            </div>
          </div>
        </div>

        {/* Visual Queue Cards */}
        <h3 className="text-xs font-bold font-mono uppercase text-text-secondary tracking-wider mb-3">
          CPU READY QUEUES AND SCHEDULER STATES
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QueueCard
            title="Running Processes"
            subtitle="Active medical treatments"
            patients={runningPatients}
            status="Running"
          />
          <QueueCard
            title="Ready Queue"
            subtitle="Patients waiting for dispatcher"
            patients={readyPatients}
            status="Ready"
          />
          <QueueCard
            title="Waiting Queue"
            subtitle="Starvation prevention locks"
            patients={waitingPatients}
            status="Waiting"
          />
          <QueueCard
            title="Completed Processes"
            subtitle="Discharged patients"
            patients={completedPatients}
            status="Completed"
          />
        </div>
      </PageShell>
    </UnifiedDashboardLayout>
  );
}
