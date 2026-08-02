'use client';

import React, { type ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function ChartCard({ title, subtitle, children }: ChartCardProps) {
  return (
    <div className="card-os p-4 border border-border flex flex-col gap-3 min-h-[300px]">
      <div>
        <h4 className="text-xs font-bold font-mono uppercase text-text-primary">{title}</h4>
        {subtitle && <p className="text-[10px] text-text-muted font-mono mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex-1 w-full h-[220px]">
        {children}
      </div>
    </div>
  );
}
export default ChartCard;
