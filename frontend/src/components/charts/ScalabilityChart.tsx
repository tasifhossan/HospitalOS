'use client';

import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface ScalabilityChartProps {
  data: { requests: number; cpu: number; memory: number; waitingTime: number }[];
}

export function ScalabilityChart({ data }: ScalabilityChartProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <XAxis dataKey="requests" stroke="var(--text-muted)" fontSize={9} tickLine={false} axisLine={false} />
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
        <Area type="monotone" dataKey="cpu" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.1} name="CPU Load (%)" />
        <Area type="monotone" dataKey="memory" stroke="var(--info)" fill="var(--info)" fillOpacity={0.1} name="Memory Usage (%)" />
        <Area type="monotone" dataKey="waitingTime" stroke="var(--warning)" fill="var(--warning)" fillOpacity={0.1} name="Avg Wait Time (ms)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
