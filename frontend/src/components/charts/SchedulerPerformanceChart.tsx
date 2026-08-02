'use client';

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface SchedulerPerformanceChartProps {
  data: { policy: string; waitingTime: number; turnaroundTime: number; responseTime: number }[];
}

export function SchedulerPerformanceChart({ data }: SchedulerPerformanceChartProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <XAxis dataKey="policy" stroke="var(--text-muted)" fontSize={9} tickLine={false} axisLine={false} />
        <YAxis stroke="var(--text-muted)" fontSize={9} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            fontSize: '10px',
            fontFamily: 'monospace',
          }}
          labelStyle={{ color: 'var(--text-primary)' }}
        />
        <Legend wrapperStyle={{ fontSize: '9px', fontFamily: 'monospace' }} />
        <Bar dataKey="waitingTime" fill="var(--danger)" name="Avg Wait Time" radius={[2, 2, 0, 0]} />
        <Bar dataKey="turnaroundTime" fill="var(--primary)" name="Avg Turnaround" radius={[2, 2, 0, 0]} />
        <Bar dataKey="responseTime" fill="var(--success)" name="Avg Response" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
