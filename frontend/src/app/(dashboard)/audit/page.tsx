'use client';

import { PageShell } from '@/components/shared/PageShell';
import { ClipboardList, Shield, Eye, Clock } from 'lucide-react';

export default function AuditPage() {
  return (
    <PageShell title="Audit Log" subtitle="Tamper-evident system action history">
      <div className="flex flex-col items-center justify-center py-24 rounded-xl border text-center"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', borderStyle: 'dashed' }}
      >
        <div className="flex gap-3 mb-6">
          {[ClipboardList, Shield, Eye, Clock].map((Icon, i) => (
            <div key={i} className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--primary-muted)' }}>
              <Icon className="w-5 h-5" style={{ color: 'var(--primary)' }} />
            </div>
          ))}
        </div>
        <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Audit Log</h3>
        <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
          All privileged actions — file access, patient mutations, scheduler changes — are written to
          the audit table with user, timestamp, and metadata. Paginated view coming soon.
        </p>
        <div
          className="px-3 py-1.5 rounded-lg text-[11px] font-mono"
          style={{ background: 'var(--surface-elevated)', color: 'var(--primary)', border: '1px solid var(--border)' }}
        >
          Route: /audit · Role: ADMIN
        </div>
      </div>
    </PageShell>
  );
}
