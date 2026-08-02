'use client';

import { PageShell } from '@/components/shared/PageShell';
import { StatCard } from '@/components/shared/StatCard';
import { HeartPulse, Users, FolderLock, Activity } from 'lucide-react';

import { NurseLayout } from '@/components/layout/RoleLayouts';

export default function NursePage() {
  return (
    <NurseLayout>
      <PageShell title="Nurse Station" subtitle="Lab reports & patient observation">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="Patients Under Care" value="—" icon={Users} variant="success" />
          <StatCard title="Lab Reports" value="—" icon={FolderLock} variant="primary" />
          <StatCard title="Observations" value="—" icon={Activity} variant="info" />
          <StatCard title="Vitals Recorded" value="—" icon={HeartPulse} variant="warning" />
        </div>
        <div
          className="flex flex-col items-center justify-center py-24 rounded-xl border text-center"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)', borderStyle: 'dashed' }}
        >
          <HeartPulse className="w-10 h-10 mb-4" style={{ color: 'var(--success)' }} />
          <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Nurse Station</h3>
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
            Patient observation records, lab report access, and vitals tracking coming soon.
          </p>
          <div
            className="px-3 py-1.5 rounded-lg text-[11px] font-mono"
            style={{ background: 'var(--surface-elevated)', color: 'var(--success)', border: '1px solid var(--border)' }}
          >
            Route: /nurse · Role: NURSE | ADMIN
          </div>
        </div>
      </PageShell>
    </NurseLayout>
  );
}
