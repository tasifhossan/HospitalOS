'use client';

import React from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { ClipboardList } from 'lucide-react';

import { UnifiedDashboardLayout } from '@/components/layout/RoleLayouts';

export default function AuditLogsPage() {
  return (
    <UnifiedDashboardLayout>
      <PageShell
        title="Audit Logs"
        subtitle="Kernel system action trace logs (Tamper-evident)"
      >
        <div className="flex flex-col items-center justify-center py-20 px-6 rounded-xl border border-dashed border-border bg-surface/50 text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-info-muted border border-info/30 glow-info mb-4">
            <ClipboardList className="w-7 h-7 text-info" />
          </div>
          <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Audit Logs</h3>
          <p className="text-sm max-w-md mb-4" style={{ color: 'var(--text-muted)' }}>
            Trace log tracking privileges elevations, file downloads, user register events, and scheduler swaps.
          </p>
          <div
            className="px-3 py-1.5 rounded-lg text-[11px] font-mono"
            style={{ background: 'var(--surface-elevated)', color: 'var(--info)', border: '1px solid var(--border)' }}
          >
            Endpoint: GET /api/audit
          </div>
        </div>
      </PageShell>
    </UnifiedDashboardLayout>
  );
}
