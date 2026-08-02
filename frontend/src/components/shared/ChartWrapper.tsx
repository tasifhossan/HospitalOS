'use client';

import type { ReactNode } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import type { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { cn } from '@/lib/utils';

interface OsTooltipPayloadEntry {
  name?: NameType;
  value?: ValueType;
  color?: string;
}

interface OsTooltipProps {
  active?: boolean;
  payload?: OsTooltipPayloadEntry[];
  label?: string;
}

// ─── Custom Tooltip ────────────────────────────────────────────────────────────
function OsTooltip({ active, payload, label }: OsTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-lg border px-3 py-2 text-xs font-mono shadow-lg"
      style={{
        background: 'var(--surface-elevated)',
        borderColor: 'var(--border-bright)',
        color: 'var(--text-primary)',
      }}
    >
      <p className="font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </p>
      {payload.map((entry) => (
        <div key={String(entry.name ?? '')} className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: entry.color }}
          />
          <span style={{ color: 'var(--text-muted)' }}>{String(entry.name ?? '')}:</span>
          <span style={{ color: 'var(--text-primary)' }}>{String(entry.value ?? '')}</span>
        </div>
      ))}
    </div>
  );
}

const CHART_DEFAULTS = {
  grid: { stroke: 'var(--border-subtle)', strokeDasharray: '4 4' },
  axis: { stroke: 'var(--border)', tick: { fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)' } },
};

// ─── ChartWrapper container ───────────────────────────────────────────────────
interface ChartWrapperProps {
  title?: string;
  subtitle?: string;
  height?: number;
  loading?: boolean;
  children: ReactNode;
  className?: string;
}

export function ChartWrapper({
  title,
  subtitle,
  height = 280,
  loading = false,
  children,
  className,
}: ChartWrapperProps) {
  return (
    <div
      className={cn('card-os', className)}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      {loading ? (
        <div className="skeleton rounded-lg" style={{ height }} />
      ) : (
        <div style={{ height }}>{children}</div>
      )}
    </div>
  );
}

// ─── Pre-built chart types ─────────────────────────────────────────────────────
interface ChartDataPoint {
  [key: string]: string | number;
}

interface OsLineChartProps {
  data: ChartDataPoint[];
  lines: { key: string; color: string; label?: string }[];
  xKey?: string;
  height?: number;
}

export function OsLineChart({ data, lines, xKey = 'name', height = 240 }: OsLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
        <CartesianGrid {...CHART_DEFAULTS.grid} />
        <XAxis dataKey={xKey} {...CHART_DEFAULTS.axis} />
        <YAxis {...CHART_DEFAULTS.axis} />
        <Tooltip content={<OsTooltip />} />
        <Legend
          iconSize={8}
          iconType="circle"
          wrapperStyle={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
        />
        {lines.map((l) => (
          <Line
            key={l.key}
            type="monotone"
            dataKey={l.key}
            stroke={l.color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
            name={l.label ?? l.key}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

interface OsBarChartProps {
  data: ChartDataPoint[];
  bars: { key: string; color: string; label?: string }[];
  xKey?: string;
  height?: number;
}

export function OsBarChart({ data, bars, xKey = 'name', height = 240 }: OsBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
        <CartesianGrid {...CHART_DEFAULTS.grid} />
        <XAxis dataKey={xKey} {...CHART_DEFAULTS.axis} />
        <YAxis {...CHART_DEFAULTS.axis} />
        <Tooltip content={<OsTooltip />} />
        <Legend
          iconSize={8}
          wrapperStyle={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
        />
        {bars.map((b) => (
          <Bar
            key={b.key}
            dataKey={b.key}
            fill={b.color}
            radius={[4, 4, 0, 0]}
            name={b.label ?? b.key}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

interface OsAreaChartProps {
  data: ChartDataPoint[];
  areas: { key: string; color: string; label?: string }[];
  xKey?: string;
  height?: number;
}

export function OsAreaChart({ data, areas, xKey = 'name', height = 240 }: OsAreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
        <defs>
          {areas.map((a) => (
            <linearGradient key={a.key} id={`grad-${a.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={a.color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={a.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid {...CHART_DEFAULTS.grid} />
        <XAxis dataKey={xKey} {...CHART_DEFAULTS.axis} />
        <YAxis {...CHART_DEFAULTS.axis} />
        <Tooltip content={<OsTooltip />} />
        <Legend
          iconSize={8}
          wrapperStyle={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
        />
        {areas.map((a) => (
          <Area
            key={a.key}
            type="monotone"
            dataKey={a.key}
            stroke={a.color}
            fill={`url(#grad-${a.key})`}
            strokeWidth={2}
            name={a.label ?? a.key}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
