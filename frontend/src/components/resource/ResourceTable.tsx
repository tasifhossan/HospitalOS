'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ResourceRow {
  id: string;
  name: string;
  type: string;
  capacity: number;
  allocated: number;
  available: number;
  waiting: number;
  utilization: number;
  status: 'Available' | 'Busy' | 'Critical' | 'Offline';
}

interface ResourceTableProps {
  resources: ResourceRow[];
  onSelectResource?: (row: ResourceRow) => void;
}

export function ResourceTable({ resources, onSelectResource }: ResourceTableProps) {
  return (
    <div className="card-os border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse font-mono text-xs">
          <thead>
            <tr className="border-b border-border/80 text-[10px] text-text-muted bg-surface-elevated/50">
              <th className="p-3 uppercase">Resource Lock</th>
              <th className="p-3 uppercase">Type</th>
              <th className="p-3 uppercase text-center">Capacity</th>
              <th className="p-3 uppercase text-center">Allocated</th>
              <th className="p-3 uppercase text-center">Available</th>
              <th className="p-3 uppercase text-center">Waiting Q</th>
              <th className="p-3 uppercase text-right">Utilization</th>
              <th className="p-3 uppercase text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {resources.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-text-muted">
                  No semaphore variables active in pool.
                </td>
              </tr>
            ) : (
              resources.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => onSelectResource?.(r)}
                  className="hover:bg-surface-elevated/40 cursor-pointer transition-colors"
                >
                  <td className="p-3 font-semibold text-text-primary">{r.name}</td>
                  <td className="p-3 text-[10px] text-text-muted">{r.type}</td>
                  <td className="p-3 text-center">{r.capacity}</td>
                  <td className="p-3 text-center text-primary font-bold">{r.allocated}</td>
                  <td className="p-3 text-center text-success">{r.available}</td>
                  <td className="p-3 text-center text-warning font-semibold">{r.waiting}</td>
                  <td className="p-3 text-right text-text-secondary">{r.utilization}%</td>
                  <td className="p-3 text-center">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-bold border",
                      r.status === 'Available' ? 'text-success bg-success/5 border-success/20' :
                      r.status === 'Busy' ? 'text-warning bg-warning/5 border-warning/20' :
                      r.status === 'Critical' ? 'text-danger bg-danger/5 border-danger/20' :
                      'text-text-muted bg-surface-elevated border-border'
                    )}>
                      {r.status}
                    </span>
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
export default ResourceTable;
