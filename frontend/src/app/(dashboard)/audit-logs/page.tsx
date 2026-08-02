'use client';

import React, { useEffect, useState } from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { UnifiedDashboardLayout } from '@/components/layout/RoleLayouts';
import { AuditTable } from '@/components/audit/AuditTable';
import { AuditTimeline } from '@/components/audit/AuditTimeline';
import { AuditFilterBar } from '@/components/audit/AuditFilterBar';
import { auditService } from '@/services/auditService';
import type { AuditLog } from '@/types/audit';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(15);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const fetchLogs = () => {
    const params: any = {
      page,
      limit,
    };
    if (search) {
      params.userEmail = search;
    }
    if (category) {
      params.action = category;
    }

    auditService.list(params)
      .then((data) => {
        if (data) {
          setLogs(data.logs || []);
          setTotal(data.pagination?.total || 0);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchLogs();
  }, [page, search, category]);

  return (
    <UnifiedDashboardLayout>
      <PageShell
        title="Audit Logs"
        subtitle="Kernel system action trace logs & event security registry"
      >
        <div className="space-y-6">
          <AuditFilterBar
            onSearchChange={setSearch}
            onCategoryChange={setCategory}
            category={category}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AuditTable
                logs={logs}
                total={total}
                page={page}
                limit={limit}
                onPageChange={setPage}
              />
            </div>
            <div>
              <AuditTimeline logs={logs} />
            </div>
          </div>
        </div>
      </PageShell>
    </UnifiedDashboardLayout>
  );
}
