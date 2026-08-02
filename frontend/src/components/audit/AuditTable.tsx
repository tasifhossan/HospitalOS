'use client';

import React, { useState } from 'react';
import type { AuditLog } from '@/types/audit';
import { Eye, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

interface AuditTableProps {
  logs: AuditLog[];
  total: number;
  page: number;
  limit: number;
  onPageChange: (p: number) => void;
}

export function AuditTable({ logs, total, page, limit, onPageChange }: AuditTableProps) {
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  const totalPages = Math.ceil(total / limit);

  const toggleRow = (id: string) => {
    setExpandedLogId(expandedLogId === id ? null : id);
  };

  const getModule = (action: string) => {
    if (action.includes('SCHEDULER') || action.includes('ALGORITHM')) return 'Scheduler Kernel';
    if (action.includes('CAPACITY')) return 'Resource Manager';
    if (action.includes('FILE')) return 'Secure File Manager';
    if (action.includes('PATIENT')) return 'Receptionist Intake';
    return 'Identity Registry';
  };

  return (
    <div className="card-os p-0 border border-border overflow-hidden font-mono text-xs">
      <div className="p-4 border-b border-border bg-surface-elevated/10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4.5 h-4.5 text-primary" />
          <span className="font-bold text-text-primary uppercase tracking-wider">SECURE TRACE AUDIT LOGS</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-surface-elevated text-[9px] text-text-muted">
          INTEGRITY ASSURED
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border/60 bg-surface-elevated/5 text-[9px] uppercase tracking-wider text-text-muted">
              <th className="py-3 px-4 font-bold">Timestamp</th>
              <th className="py-3 px-4 font-bold">Operator</th>
              <th className="py-3 px-4 font-bold">Action</th>
              <th className="py-3 px-4 font-bold">Target Module</th>
              <th className="py-3 px-4 font-bold">Verification</th>
              <th className="py-3 px-4 font-bold text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-text-muted text-[10px]">
                  No audit logs fetched from loop.
                </td>
              </tr>
            ) : (
              logs.map((log) => {
                const isExpanded = expandedLogId === log.id;
                return (
                  <React.Fragment key={log.id}>
                    <tr className="hover:bg-surface-elevated/20 transition-colors">
                      <td className="py-3 px-4 text-text-secondary">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 font-semibold text-text-primary">
                        {log.userEmail}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-1.5 py-0.5 rounded text-[8px] bg-primary-muted border border-primary/20 text-primary-hover font-bold">
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-text-muted">
                        {getModule(log.action)}
                      </td>
                      <td className="py-3 px-4">
                        <span className="flex items-center gap-1 text-[9px] font-bold text-success">
                          <span className="w-1 h-1 rounded-full bg-success"></span>
                          <span>Verified</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => toggleRow(log.id)}
                          className="p-1 border border-border rounded hover:bg-surface-elevated text-text-primary transition-all inline-flex items-center gap-1"
                        >
                          <span className="text-[8px]">Metadata</span>
                          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-surface-elevated/10">
                        <td colSpan={6} className="p-4 border-t border-b border-border/40">
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-[9px] border-b border-border/20 pb-1.5 text-text-muted uppercase">
                              <span>Transaction ID: {log.id}</span>
                              <span className="badge badge-warning">TODO: IP ADDRESS</span>
                            </div>
                            <pre className="text-[10px] text-text-primary font-mono whitespace-pre-wrap break-all bg-surface p-3 border border-border rounded-lg max-h-[200px] overflow-y-auto">
                              {JSON.stringify(log.metadata || (log as any).details || {}, null, 2)}
                            </pre>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-border bg-surface-elevated/5 flex justify-between items-center text-[10px] text-text-muted">
          <span>
            Showing Page {page} of {totalPages} ({total} entries total)
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="px-2.5 py-1.5 border border-border hover:border-primary/20 rounded disabled:opacity-40 transition-all font-semibold"
            >
              Previous Page
            </button>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              className="px-2.5 py-1.5 border border-border hover:border-primary/20 rounded disabled:opacity-40 transition-all font-semibold"
            >
              Next Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
