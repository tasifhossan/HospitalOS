'use client';

import { PageShell } from '@/components/shared/PageShell';
import { StatCard } from '@/components/shared/StatCard';
import { LayoutDashboard, Users, Cpu, Shield, Activity, AlertTriangle } from 'lucide-react';

import { AdminLayout } from '@/components/layout/RoleLayouts';

export default function AdminPage() {
  return (
    <AdminLayout>
      <PageShell
        title="Admin Dashboard"
        subtitle="Full system control and monitoring"
      >
        {/* Stat cards placeholder grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Users" value="—" icon={Users} variant="primary" />
          <StatCard title="Active Patients" value="—" icon={Activity} variant="success" />
          <StatCard title="Scheduler" value="—" icon={Cpu} variant="info" />
          <StatCard title="Deadlocks" value="—" icon={AlertTriangle} variant="danger" />
        </div>

        {/* Coming soon notice */}
        <div
          className="flex flex-col items-center justify-center py-24 rounded-xl border text-center"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)', borderStyle: 'dashed' }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            style={{ background: 'var(--primary-muted)' }}
          >
            <LayoutDashboard className="w-6 h-6" style={{ color: 'var(--primary)' }} />
          </div>
          <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
            Admin Dashboard
          </h3>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Real-time monitoring, user management, scheduler control, and audit access coming soon.
          </p>
          <div
            className="mt-4 px-3 py-1.5 rounded-lg text-[11px] font-mono"
            style={{ background: 'var(--surface-elevated)', color: 'var(--primary)', border: '1px solid var(--border)' }}
          >
            Route: /admin · Role: ADMIN
          </div>
        </div>
      </PageShell>
    </AdminLayout>
  );
}
