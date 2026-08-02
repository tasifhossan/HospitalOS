'use client';

import { PageShell } from '@/components/shared/PageShell';
import { StatCard } from '@/components/shared/StatCard';
import { User, FolderLock, CalendarDays, FileText } from 'lucide-react';

import { PatientLayout } from '@/components/layout/RoleLayouts';

export default function PatientPage() {
  return (
    <PatientLayout>
      <PageShell title="Patient Portal" subtitle="Your own records, appointments & prescriptions">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="My Appointments" value="—" icon={CalendarDays} variant="primary" />
          <StatCard title="Prescriptions" value="—" icon={FileText} variant="success" />
          <StatCard title="Lab Reports" value="—" icon={FolderLock} variant="info" />
          <StatCard title="Medical Files" value="—" icon={User} variant="warning" />
        </div>
        <div
          className="flex flex-col items-center justify-center py-24 rounded-xl border text-center"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)', borderStyle: 'dashed' }}
        >
          <User className="w-10 h-10 mb-4" style={{ color: 'var(--info)' }} />
          <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Patient Portal</h3>
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
            View your appointments, download prescriptions, and access lab reports coming soon.
          </p>
          <div
            className="px-3 py-1.5 rounded-lg text-[11px] font-mono"
            style={{ background: 'var(--surface-elevated)', color: 'var(--info)', border: '1px solid var(--border)' }}
          >
            Route: /patient · Role: PATIENT
          </div>
        </div>
      </PageShell>
    </PatientLayout>
  );
}
