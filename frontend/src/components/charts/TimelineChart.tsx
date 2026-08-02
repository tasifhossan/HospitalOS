'use client';

import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface TimelineChartProps {
  data: { tick: number; waitTime: number; turnaroundTime: number }[];
}

export function TimelineChart({ data }: TimelineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="tick"
          stroke="var(--text-muted)"
          fontSize={9}
          tickLine={false}
          axisLine={false}
          label={{ value: 'Clock Ticks', position: 'insideBottom', offset: -5, fill: 'var(--text-muted)', fontSize: 8 }}
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
        <Line
          type="monotone"
          dataKey="waitTime"
          stroke="var(--warning)"
          strokeWidth={1.5}
          dot={false}
          name="Avg Wait Time"
        />
        <Line
          type="monotone"
          dataKey="turnaroundTime"
          stroke="var(--primary)"
          strokeWidth={1.5}
          dot={false}
          name="Avg Turnaround"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
export default TimelineChart;
