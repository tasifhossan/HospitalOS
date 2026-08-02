'use client';

import { PageShell } from '@/components/shared/PageShell';
import { StatCard } from '@/components/shared/StatCard';
import { UserCheck, Users, CalendarDays, Clock } from 'lucide-react';

import { ReceptionistLayout } from '@/components/layout/RoleLayouts';

export default function ReceptionistPage() {
  return (
    <ReceptionistLayout>
      <PageShell title="Reception Desk" subtitle="Patient registration & appointment management">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="Registered Patients" value="—" icon={Users} variant="primary" />
          <StatCard title="Today's Appointments" value="—" icon={CalendarDays} variant="success" />
          <StatCard title="Pending Check-in" value="—" icon={Clock} variant="warning" />
          <StatCard title="Completed Today" value="—" icon={UserCheck} variant="info" />
        </div>
        <div
          className="flex flex-col items-center justify-center py-24 rounded-xl border text-center"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)', borderStyle: 'dashed' }}
        >
          <UserCheck className="w-10 h-10 mb-4" style={{ color: 'var(--warning)' }} />
          <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Reception Desk</h3>
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
            Patient registration, appointment booking, and queue management coming soon.
          </p>
          <div
            className="px-3 py-1.5 rounded-lg text-[11px] font-mono"
            style={{ background: 'var(--surface-elevated)', color: 'var(--warning)', border: '1px solid var(--border)' }}
          >
            Route: /receptionist · Role: RECEPTIONIST | ADMIN
          </div>
        </div>
      </PageShell>
    </ReceptionistLayout>
  );
}
