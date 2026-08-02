'use client';

import React from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { Sliders } from 'lucide-react';

import { UnifiedDashboardLayout } from '@/components/layout/RoleLayouts';

export default function SystemControlPage() {
  return (
    <UnifiedDashboardLayout>
      <PageShell
        title="System Control"
        subtitle="Kernel scheduler swaps & timing parameters"
      >
        <div className="flex flex-col items-center justify-center py-20 px-6 rounded-xl border border-dashed border-border bg-surface/50 text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-primary-muted border border-primary-glow glow-primary mb-4">
            <Sliders className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>System Control Console</h3>
          <p className="text-sm max-w-md mb-4" style={{ color: 'var(--text-muted)' }}>
            Configure scheduling algorithm parameters, time quantums, simulation clock tick rate, or initiate benchmark workloads.
          </p>
          <div
            className="px-3 py-1.5 rounded-lg text-[11px] font-mono"
            style={{ background: 'var(--surface-elevated)', color: 'var(--primary)', border: '1px solid var(--border)' }}
          >
            Endpoint: POST /api/sim/scheduler
          </div>
        </div>
      </PageShell>
    </UnifiedDashboardLayout>
  );
}
