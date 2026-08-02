'use client';

import React from 'react';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  className?: string;
}

export function AnalyticsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  className = '',
}: AnalyticsCardProps) {
  return (
    <div className={`card-os p-4 border border-border flex flex-col justify-between font-mono text-xs ${className}`}>
      <div className="flex justify-between items-start gap-2">
        <div className="space-y-1">
          <span className="text-[9px] text-text-muted uppercase tracking-wider block">{title}</span>
          <span className="text-xl font-bold text-text-primary block mt-0.5">{value}</span>
        </div>
        {icon && <div className="p-1.5 rounded-lg bg-surface-elevated text-primary shrink-0">{icon}</div>}
      </div>
      {(subtitle || trend) && (
        <div className="flex justify-between items-center mt-3 pt-2 border-t border-border/20 text-[9px]">
          <span className="text-text-muted">{subtitle}</span>
          {trend && (
            <span className={trend.isPositive ? 'text-success font-bold' : 'text-danger font-bold'}>
              {trend.value}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export function MetricGrid({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ${className}`}>
      {children}
    </div>
  );
}

export function PerformanceTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | number | React.ReactNode)[][];
}) {
  return (
    <div className="overflow-x-auto border border-border rounded-lg bg-surface">
      <table className="w-full text-left border-collapse font-mono text-xs">
        <thead>
          <tr className="border-b border-border/60 bg-surface-elevated/5 text-[9px] uppercase tracking-wider text-text-muted">
            {headers.map((h, i) => (
              <th key={i} className="py-3 px-4 font-bold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/20">
          {rows.map((row, idx) => (
            <tr key={idx} className="hover:bg-surface-elevated/20 transition-colors">
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="py-3 px-4 text-text-primary">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SchedulerInsightCard({
  title,
  purpose,
  queueDesc,
  recommended = false,
}: {
  title: string;
  purpose: string;
  queueDesc: string;
  recommended?: boolean;
}) {
  return (
    <div className={`p-4 border rounded-lg font-mono text-xs ${recommended ? 'bg-primary-muted/20 border-primary/50' : 'bg-surface border-border'}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-text-primary text-[10px] uppercase">{title}</span>
        {recommended && (
          <span className="px-2 py-0.5 rounded bg-primary/20 border border-primary/40 text-[9px] text-primary font-bold">
            RECOMMENDED POLICY
          </span>
        )}
      </div>
      <div className="space-y-1.5 text-[9px] text-text-muted">
        <div>• <span className="text-text-primary">Target:</span> {purpose}</div>
        <div>• <span className="text-text-primary">Ready Queue Logic:</span> {queueDesc}</div>
      </div>
    </div>
  );
}

export function UtilizationCard({
  name,
  value,
  allocated,
  capacity,
  waiting,
}: {
  name: string;
  value: number;
  allocated: number;
  capacity: number;
  waiting: number;
}) {
  return (
    <div className="card-os p-4 border border-border space-y-3 font-mono text-xs">
      <div className="flex justify-between items-center">
        <span className="font-bold text-text-primary uppercase text-[10px]">{name}</span>
        <span className="text-xs font-bold text-primary">{value}%</span>
      </div>
      <div className="w-full bg-surface-elevated rounded-full h-1.5 overflow-hidden">
        <div className="bg-primary h-1.5" style={{ width: `${value}%` }}></div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-[8px] text-text-muted mt-2 border-t border-border/20 pt-2">
        <div>
          <span>ALLOCATED</span>
          <span className="block text-text-primary font-bold">{allocated} / {capacity}</span>
        </div>
        <div>
          <span>AVAILABLE</span>
          <span className="block text-success font-bold">{Math.max(0, capacity - allocated)}</span>
        </div>
        <div>
          <span>WAITING</span>
          <span className="block text-danger font-bold">{waiting}</span>
        </div>
      </div>
    </div>
  );
}

export function ScalabilityCard({
  requests,
  cpu,
  memory,
  throughput,
  waiting,
  todo = false,
}: {
  requests: number;
  cpu: string;
  memory: string;
  throughput: string;
  waiting: string;
  todo?: boolean;
}) {
  return (
    <div className="card-os p-4 border border-border space-y-4 font-mono text-xs relative overflow-hidden">
      <div className="flex justify-between items-center border-b border-border/60 pb-2">
        <span className="font-bold text-text-primary uppercase text-[10px]">{requests} Simultaneous Requests</span>
        {todo && <span className="badge badge-warning text-[8px] scale-90">TODO: PENDING STRESS ENGINE</span>}
      </div>
      <div className="grid grid-cols-2 gap-3 text-[10px]">
        <div>
          <span className="text-[8px] text-text-muted block">CPU LOAD</span>
          <span className="text-text-primary font-semibold">{cpu}</span>
        </div>
        <div>
          <span className="text-[8px] text-text-muted block">MEMORY FRAME</span>
          <span className="text-text-primary font-semibold">{memory}</span>
        </div>
        <div>
          <span className="text-[8px] text-text-muted block">THROUGHPUT</span>
          <span className="text-text-primary font-semibold">{throughput}</span>
        </div>
        <div>
          <span className="text-[8px] text-text-muted block">AVG WAITING TIME</span>
          <span className="text-text-primary font-semibold">{waiting}</span>
        </div>
      </div>
    </div>
  );
}

export function ExportCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="card-os p-4 border border-border flex justify-between items-center font-mono text-xs gap-4">
      <div className="space-y-1">
        <span className="font-bold text-text-primary uppercase block">{title}</span>
        <span className="text-[9px] text-text-muted block">{desc}</span>
      </div>
      <div className="flex gap-2 items-center shrink-0">
        <span className="badge badge-warning text-[9px] scale-90">TODO: EXPORT API</span>
      </div>
    </div>
  );
}

export function AnalyticsSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="border-b border-border/60 pb-2">
        <h3 className="text-sm font-bold text-text-primary uppercase font-mono tracking-wider">{title}</h3>
        <p className="text-[10px] text-text-muted font-mono mt-0.5">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}
