'use client';

import { motion } from 'framer-motion';
import type { ReactNode, ElementType } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ElementType;
  trend?: { value: number; label: string };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  loading?: boolean;
  className?: string;
  children?: ReactNode;
}

const VARIANT_STYLES = {
  default: {
    iconBg: 'var(--surface-overlay)',
    iconColor: 'var(--text-secondary)',
    valueBg: 'transparent',
  },
  primary: {
    iconBg: 'var(--primary-muted)',
    iconColor: 'var(--primary-hover)',
    valueBg: 'transparent',
  },
  success: {
    iconBg: 'var(--success-muted)',
    iconColor: 'var(--success)',
    valueBg: 'transparent',
  },
  warning: {
    iconBg: 'var(--warning-muted)',
    iconColor: 'var(--warning)',
    valueBg: 'transparent',
  },
  danger: {
    iconBg: 'var(--danger-muted)',
    iconColor: 'var(--danger)',
    valueBg: 'transparent',
  },
  info: {
    iconBg: 'var(--info-muted)',
    iconColor: 'var(--info)',
    valueBg: 'transparent',
  },
};

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
  loading = false,
  className,
  children,
}: StatCardProps) {
  const styles = VARIANT_STYLES[variant];

  if (loading) {
    return (
      <div className={cn('card-os', className)}>
        <div className="skeleton h-4 w-24 mb-3 rounded" />
        <div className="skeleton h-8 w-16 mb-2 rounded" />
        <div className="skeleton h-3 w-32 rounded" />
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className={cn('card-os group cursor-default', className)}
    >
      <div className="flex items-start justify-between mb-3">
        <p
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: 'var(--text-muted)' }}
        >
          {title}
        </p>
        {Icon && (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            style={{ background: styles.iconBg }}
          >
            <Icon className="w-4 h-4" style={{ color: styles.iconColor }} />
          </div>
        )}
      </div>

      <div className="flex items-end gap-2">
        <span
          className="text-2xl font-bold font-mono tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          {value}
        </span>
        {trend && (
          <span
            className={cn(
              'text-xs font-medium mb-0.5',
              trend.value >= 0 ? 'text-[color:var(--success)]' : 'text-[color:var(--danger)]',
            )}
          >
            {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
        )}
      </div>

      {(subtitle || trend) && (
        <p className="text-xs mt-1.5" style={{ color: 'var(--text-muted)' }}>
          {subtitle ?? trend?.label}
        </p>
      )}

      {children && <div className="mt-3">{children}</div>}
    </motion.div>
  );
}
