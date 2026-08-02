'use client';

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface ResourceUtilizationChartProps {
  data: { name: string; value: number }[];
}

export function ResourceUtilizationChart({ data }: ResourceUtilizationChartProps) {
  const colors = ['var(--primary)', 'var(--success)', 'var(--warning)', 'var(--info)', 'var(--danger)'];

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
        <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={8.5} tickLine={false} axisLine={false} />
        <YAxis stroke="var(--text-muted)" fontSize={9} tickLine={false} axisLine={false} domain={[0, 100]} />
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
        <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
