'use client';

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface QueueChartProps {
  data: { name: string; ready: number; active: number; completed: number }[];
}

export function QueueChart({ data }: QueueChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
        <XAxis
          dataKey="name"
          stroke="var(--text-muted)"
          fontSize={9}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="var(--text-muted)"
          fontSize={9}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            fontSize: '10px',
            fontFamily: 'monospace',
          }}
        />
        <Legend
          wrapperStyle={{ fontSize: '9px', fontFamily: 'monospace', marginTop: '10px' }}
        />
        <Bar dataKey="ready" fill="var(--warning)" radius={[4, 4, 0, 0]} name="Ready Queue" />
        <Bar dataKey="active" fill="var(--success)" radius={[4, 4, 0, 0]} name="Running Processes" />
        <Bar dataKey="completed" fill="var(--text-muted)" radius={[4, 4, 0, 0]} name="Completed" />
      </BarChart>
    </ResponsiveContainer>
  );
}
export default QueueChart;
