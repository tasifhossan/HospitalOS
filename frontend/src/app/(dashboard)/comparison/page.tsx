'use client';

import { PageShell } from '@/components/shared/PageShell';
import { GitCompare, BarChart3, Cpu, Zap } from 'lucide-react';

export default function ComparisonPage() {
  return (
    <PageShell title="Algorithm Comparison" subtitle="Benchmark scheduling algorithms against the same workload">
      <div className="flex flex-col items-center justify-center py-24 rounded-xl border text-center"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', borderStyle: 'dashed' }}
      >
        <div className="flex gap-3 mb-6">
          {[Cpu, GitCompare, BarChart3, Zap].map((Icon, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--primary-muted)' }}
            >
              <Icon className="w-5 h-5" style={{ color: 'var(--primary)' }} />
            </div>
          ))}
        </div>
        <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Algorithm Comparison Engine</h3>
        <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
          Run FCFS vs SJF vs PRIORITY_AGING vs MULTILEVEL vs ROUND_ROBIN benchmarks on identical
          patient workloads. Compare throughput, wait time, and starvation metrics.
        </p>
        <div
          className="px-3 py-1.5 rounded-lg text-[11px] font-mono"
          style={{ background: 'var(--surface-elevated)', color: 'var(--primary)', border: '1px solid var(--border)' }}
        >
          Route: /comparison · Role: ADMIN
        </div>
      </div>
    </PageShell>
  );
}
