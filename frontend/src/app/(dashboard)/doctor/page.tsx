'use client';

import { PageShell } from '@/components/shared/PageShell';
import { StatCard } from '@/components/shared/StatCard';
import { Stethoscope, Users, FolderLock, CalendarDays } from 'lucide-react';

import { DoctorLayout } from '@/components/layout/RoleLayouts';

export default function DoctorPage() {
  return (
    <DoctorLayout>
      <PageShell title="Doctor Portal" subtitle="Patient records, prescriptions & medical reports">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="My Patients" value="—" icon={Users} variant="primary" />
          <StatCard title="Appointments" value="—" icon={CalendarDays} variant="info" />
          <StatCard title="Files" value="—" icon={FolderLock} variant="success" />
          <StatCard title="Prescriptions" value="—" icon={Stethoscope} variant="warning" />
        </div>
        <div
          className="flex flex-col items-center justify-center py-24 rounded-xl border text-center"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)', borderStyle: 'dashed' }}
        >
          <Stethoscope className="w-10 h-10 mb-4" style={{ color: 'var(--primary)' }} />
          <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Doctor Portal</h3>
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
            Patient list, prescription management, medical report uploads coming soon.
          </p>
          <div
            className="px-3 py-1.5 rounded-lg text-[11px] font-mono"
            style={{ background: 'var(--surface-elevated)', color: 'var(--primary)', border: '1px solid var(--border)' }}
          >
            Route: /doctor · Role: DOCTOR | ADMIN
          </div>
        </div>
      </PageShell>
    </DoctorLayout>
  );
}
