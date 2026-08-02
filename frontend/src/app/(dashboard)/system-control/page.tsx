'use client';

import React, { useEffect, useState } from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { UnifiedDashboardLayout } from '@/components/layout/RoleLayouts';
import { SystemStatusCard } from '@/components/system/SystemStatusCard';
import { SchedulerControlCard } from '@/components/system/SchedulerControlCard';
import { ConfigurationCard } from '@/components/system/ConfigurationCard';
import { useSocket } from '@/hooks/useSocket';
import { simulationService } from '@/services/simulationService';
import type { SchedulerType } from '@/types/simulation';

export default function SystemControlPage() {
  const { isConnected, snapshot } = useSocket();
  const [currentAlgorithm, setCurrentAlgorithm] = useState<SchedulerType>('FCFS');
  const [isRunning, setIsRunning] = useState(false);
  const [tickIntervalMs, setTickIntervalMs] = useState(1000);

  // Sync state with socket snapshot updates
  useEffect(() => {
    if (snapshot) {
      setCurrentAlgorithm(snapshot.activeScheduler);
      // Determine if running based on simulated time advancing or readyQueue changes
      // The simulation clock doesn't expose isRunning directly on socket, but we can query it
      // or derive it. Let's do a fallback REST fetch to get exact running status
    }
  }, [snapshot]);

  const fetchStatus = () => {
    simulationService.getState()
      .then((data) => {
        if (data) {
          setCurrentAlgorithm(data.activeScheduler);
          setTickIntervalMs(1000); // Standard scheduler configuration
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchStatus();
    // Poll running status periodically since clock start/stop is admin-triggered
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <UnifiedDashboardLayout>
      <PageShell
        title="System Control"
        subtitle="Scheduler engine administration, infrastructure monitoring & core policy configuration"
      >
        <div className="space-y-6">
          <SystemStatusCard socketStatus={isConnected ? 'CONNECTED' : 'DISCONNECTED'} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SchedulerControlCard
                currentAlgorithm={currentAlgorithm}
                isRunning={isRunning}
                onRefresh={fetchStatus}
              />
            </div>
            <div>
              <ConfigurationCard tickIntervalMs={tickIntervalMs} />
            </div>
          </div>
        </div>
      </PageShell>
    </UnifiedDashboardLayout>
  );
}
