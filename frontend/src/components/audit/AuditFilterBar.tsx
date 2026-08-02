'use client';

import React from 'react';
import { Search, Download, FileSpreadsheet, FileDown } from 'lucide-react';

interface AuditFilterBarProps {
  onSearchChange: (val: string) => void;
  onCategoryChange: (val: string) => void;
  category: string;
}

export function AuditFilterBar({
  onSearchChange,
  onCategoryChange,
  category,
}: AuditFilterBarProps) {
  const categories = [
    { label: 'All Log Classes', value: '' },
    { label: 'Scheduler', value: 'SCHEDULER_CHANGED' },
    { label: 'Resource Capacity', value: 'CAPACITY_CHANGED' },
    { label: 'User Provisioning', value: 'USER_DELETED' },
    { label: 'Authentication', value: 'LOGIN' },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between font-mono text-xs p-4 rounded-lg border border-border bg-surface-elevated/10">
      <div className="flex flex-1 flex-col sm:flex-row gap-3 w-full">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search log entries by Operator Email..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 w-full bg-surface-elevated border border-border p-2 rounded outline-none text-text-primary focus:border-primary/50 text-xs"
          />
        </div>

        {/* Category filter */}
        <div className="relative">
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full sm:w-48 bg-surface-elevated border border-border p-2 rounded outline-none text-text-primary focus:border-primary/50 text-xs"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Export operations */}
      <div className="flex gap-2 w-full md:w-auto justify-end">
        <div className="flex gap-2 items-center">
          <button className="flex items-center gap-1.5 px-3 py-2 bg-surface-elevated border border-border hover:border-primary/30 rounded text-[10px] text-text-primary transition-all">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>CSV</span>
            <span className="badge badge-warning text-[8px] scale-90">TODO</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-surface-elevated border border-border hover:border-primary/30 rounded text-[10px] text-text-primary transition-all">
            <FileDown className="w-3.5 h-3.5" />
            <span>PDF</span>
            <span className="badge badge-warning text-[8px] scale-90">TODO</span>
          </button>
        </div>
      </div>
    </div>
  );
}
