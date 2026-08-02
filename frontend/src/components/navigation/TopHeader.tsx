'use client';

import React from 'react';
import { Activity, ShieldCheck, Cpu } from 'lucide-react';
import { useSocket } from '@/hooks/useSocket';
import { useSystemStatus } from '@/contexts/SystemStatusContext';
import { SchedulerBadge, ConnectionBadge, HealthBadge } from '@/components/status/StatusBadges';
import { ProfileDropdown } from '@/components/navigation/ProfileDropdown';
import { NotificationDrawer } from '@/components/navigation/NotificationDrawer';
import { motion } from 'framer-motion';

export function TopHeader() {
  const { isConnected, snapshot } = useSocket();
  const { cpuUsage, memoryUsage, health, schedulerStatus } = useSystemStatus();

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="sticky top-0 z-40 flex items-center justify-between px-6 border-b flex-shrink-0 select-none glass-elevated"
      style={{
        height: 'var(--navbar-height)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Left: Logo & Subtitle */}
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <Activity className="w-4.5 h-4.5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-black tracking-tight leading-none font-mono text-text-primary">
            HospitalOS
          </span>
          <span className="text-[9px] text-text-muted mt-0.5 hidden md:inline truncate max-w-[280px]">
            Adaptive Resource Scheduling & Secure Files
          </span>
        </div>
      </div>

      {/* Center: Live Scheduler status */}
      <div className="hidden lg:flex items-center gap-3">
        <SchedulerBadge
          status={schedulerStatus}
          algorithm={snapshot?.activeScheduler}
        />
        <HealthBadge status={health} />
      </div>

      {/* Right: Processes and CPU/Memory usage, Connections, Profile */}
      <div className="flex items-center gap-4">
        {/* Performance metrics */}
        <div className="hidden sm:flex items-center gap-4 font-mono text-[10px] text-text-muted border-r border-border pr-4">
          <div className="flex flex-col">
            <span className="text-[9px] text-text-muted">CPU</span>
            <span className="font-semibold text-text-primary">{cpuUsage}%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-text-muted">MEM</span>
            <span className="font-semibold text-text-primary">{memoryUsage}%</span>
          </div>
          {snapshot && (
            <>
              <div className="flex flex-col">
                <span className="text-[9px] text-text-muted font-mono">Q(R)</span>
                <span className="font-semibold text-warning">{snapshot.readyQueue.length}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-text-muted">P(T)</span>
                <span className="font-semibold text-success">{snapshot.inTreatment.length}</span>
              </div>
            </>
          )}
        </div>

        {/* WebSocket */}
        <ConnectionBadge isConnected={isConnected} />

        {/* Alerts & Drawers */}
        <NotificationDrawer />

        {/* Profile Dropdown */}
        <ProfileDropdown />
      </div>
    </motion.header>
  );
}
export default TopHeader;
