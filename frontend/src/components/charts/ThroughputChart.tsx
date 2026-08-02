'use client';

import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

interface ThroughputChartProps {
  data: { time: string; value: number }[];
}

export function ThroughputChart({ data }: ThroughputChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="thruGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--success)" stopOpacity={0.4} />
            <stop offset="95%" stopColor="var(--success)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={9} tickLine={false} axisLine={false} />
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
        <Area type="monotone" dataKey="value" stroke="var(--success)" strokeWidth={2} fillOpacity={1} fill="url(#thruGlow)" name="Throughput" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
