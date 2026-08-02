'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  statusText?: string;
  description?: string;
  statusColor?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  loading?: boolean;
}

const COLOR_MAP = {
  primary: { text: 'text-primary', border: 'border-primary/20', bg: 'bg-primary/5', glow: 'shadow-primary/5' },
  success: { text: 'text-success', border: 'border-success/20', bg: 'bg-success/5', glow: 'shadow-success/5' },
  warning: { text: 'text-warning', border: 'border-warning/20', bg: 'bg-warning/5', glow: 'shadow-warning/5' },
  danger: { text: 'text-danger', border: 'border-danger/20', bg: 'bg-danger/5', glow: 'shadow-danger/5' },
  info: { text: 'text-info', border: 'border-info/20', bg: 'bg-info/5', glow: 'shadow-info/5' },
};

export function MetricCard({
  title,
  value,
  icon: Icon,
  statusText,
  description,
  statusColor = 'primary',
  loading = false,
}: MetricCardProps) {
  const styles = COLOR_MAP[statusColor];

  if (loading) {
    return (
      <div className="card-os p-4 flex flex-col gap-2">
        <div className="skeleton h-3 w-1/3 rounded" />
        <div className="skeleton h-8 w-2/3 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className={cn(
        "card-os p-4 border flex flex-col justify-between min-h-[110px] relative overflow-hidden shadow-sm",
        styles.border,
        styles.glow
      )}
    >
      <div className="flex justify-between items-start">
        <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">{title}</span>
        {Icon && (
          <div className={cn("p-1.5 rounded-lg border", styles.border, styles.bg)}>
            <Icon className={cn("w-4 h-4", styles.text)} />
          </div>
        )}
      </div>

      <div className="mt-2 flex items-baseline justify-between gap-2">
        <span className="text-2xl font-bold font-mono tracking-tight text-text-primary">{value}</span>
        {statusText && (
          <span className={cn("text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border", styles.border, styles.bg, styles.text)}>
            {statusText}
          </span>
        )}
      </div>

      {description && (
        <p className="text-[10px] text-text-muted mt-1 truncate">{description}</p>
      )}
    </motion.div>
  );
}
