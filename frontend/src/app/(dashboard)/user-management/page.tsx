'use client';

import React from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { Users } from 'lucide-react';

import { UnifiedDashboardLayout } from '@/components/layout/RoleLayouts';

export default function UserManagementPage() {
  return (
    <UnifiedDashboardLayout>
      <PageShell
        title="User Management"
        subtitle="Identity registry and active privilege levels"
      >
        <div className="flex flex-col items-center justify-center py-20 px-6 rounded-xl border border-dashed border-border bg-surface/50 text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-warning-muted border border-warning/30 glow-warning mb-4">
            <Users className="w-7 h-7 text-warning" />
          </div>
          <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Terminal Users Registry</h3>
          <p className="text-sm max-w-md mb-4" style={{ color: 'var(--text-muted)' }}>
            Manage user credentials, assign access levels, view session memory state allocations, or revoke tokens.
          </p>
          <div
            className="px-3 py-1.5 rounded-lg text-[11px] font-mono"
            style={{ background: 'var(--surface-elevated)', color: 'var(--warning)', border: '1px solid var(--border)' }}
          >
            Endpoint: GET /api/admin/users
          </div>
        </div>
      </PageShell>
    </UnifiedDashboardLayout>
  );
}
