'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface AccessAuditRow {
  id: string;
  accessorEmail: string;
  accessType: 'UPLOAD' | 'DOWNLOAD' | 'VIEW' | 'DELETE' | 'UPDATE';
  timestamp: string;
  success: boolean;
}

interface AccessHistoryTableProps {
  audits: AccessAuditRow[];
}

export function AccessHistoryTable({ audits }: AccessHistoryTableProps) {
  return (
    <div className="card-os border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse font-mono text-xs">
          <thead>
            <tr className="border-b border-border/80 text-[10px] text-text-muted bg-surface-elevated/50">
              <th className="p-3 uppercase">Event Type</th>
              <th className="p-3 uppercase">Operator</th>
              <th className="p-3 uppercase text-center">Security Check</th>
              <th className="p-3 uppercase text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {audits.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-text-muted">
                  No access audit locks recorded.
                </td>
              </tr>
            ) : (
              audits.map((a) => (
                <tr key={a.id} className="hover:bg-surface-elevated/40 transition-colors">
                  <td className="p-3 font-semibold">
                    <span className={cn(
                      "px-1.5 py-0.5 rounded text-[8px] font-bold border uppercase",
                      a.accessType === 'UPLOAD' ? 'text-success border-success/20 bg-success/5' :
                      a.accessType === 'DOWNLOAD' ? 'text-primary border-primary/20 bg-primary/5' :
                      a.accessType === 'VIEW' ? 'text-info border-info/20 bg-info/5' :
                      'text-danger border-danger/20 bg-danger/5'
                    )}>
                      {a.accessType}
                    </span>
                  </td>
                  <td className="p-3 text-text-secondary">{a.accessorEmail}</td>
                  <td className="p-3 text-center">
                    <span className={cn(
                      "inline-flex items-center gap-1 text-[9px] font-bold",
                      a.success ? "text-success" : "text-danger"
                    )}>
                      {a.success ? 'PASS' : 'FAIL'}
                    </span>
                  </td>
                  <td className="p-3 text-right text-text-muted">
                    {formatDistanceToNow(new Date(a.timestamp), { addSuffix: true })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default AccessHistoryTable;
