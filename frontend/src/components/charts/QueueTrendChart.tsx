'use client';

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface QueueTrendChartProps {
  data: { time: string; ready: number; waiting: number; completed: number }[];
}

export function QueueTrendChart({ data }: QueueTrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
        <Legend wrapperStyle={{ fontSize: '9px', fontFamily: 'monospace' }} />
        <Bar dataKey="ready" fill="var(--primary)" radius={[2, 2, 0, 0]} name="Ready Queue" />
        <Bar dataKey="waiting" fill="var(--warning)" radius={[2, 2, 0, 0]} name="Waiting List" />
        <Bar dataKey="completed" fill="var(--success)" radius={[2, 2, 0, 0]} name="Completed" />
      </BarChart>
    </ResponsiveContainer>
  );
}
