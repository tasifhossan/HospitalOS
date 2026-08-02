'use client';

import React from 'react';
import { Activity, ShieldAlert, AlertCircle, RefreshCw, Hourglass, HelpCircle } from 'lucide-react';
import Link from 'next/link';

// ─── Loading Spinner ────────────────────────────────────────────────────────
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  }[size];

  return (
    <div className="flex items-center justify-center p-4">
      <div className={`${sizes} border-primary border-t-transparent rounded-full animate-spin`} />
    </div>
  );
}

// ─── Loading Skeleton ───────────────────────────────────────────────────────
export function LoadingSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3 w-full p-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="skeleton h-4 w-1/4 rounded" />
          <div className="skeleton h-10 w-full rounded" />
        </div>
      ))}
    </div>
  );
}

// ─── Empty State ────────────────────────────────────────────────────────────
interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 rounded-xl border border-dashed border-border bg-surface/50 text-center">
      <HelpCircle className="w-10 h-10 mb-3 text-text-muted" />
      <h3 className="text-sm font-semibold text-text-primary mb-1">{title}</h3>
      <p className="text-xs text-text-secondary max-w-sm mb-4">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-3 py-1.5 rounded-lg bg-primary-muted border border-primary-glow text-primary-hover text-xs font-medium transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

// ─── Error State ────────────────────────────────────────────────────────────
interface ErrorStateProps {
  message?: string;
  retry?: () => void;
}

export function ErrorState({ message = 'An error occurred loading this component.', retry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-xl border border-danger-muted/30 bg-danger-muted/5 text-center">
      <AlertCircle className="w-8 h-8 mb-2 text-danger" />
      <h4 className="text-sm font-semibold text-text-primary mb-1">Execution Failure</h4>
      <p className="text-xs text-text-secondary max-w-xs mb-3">{message}</p>
      {retry && (
        <button
          onClick={retry}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-danger/30 bg-danger/10 text-danger text-xs font-medium transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          Retry Operation
        </button>
      )}
    </div>
  );
}

// ─── Access Denied Screen ───────────────────────────────────────────────────
export function AccessDenied({ requiredRoles }: { requiredRoles?: string[] }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center grid-overlay min-h-[400px]">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-danger-muted/10 border border-danger/30 glow-danger mb-4">
        <ShieldAlert className="w-7 h-7 text-danger animate-pulse" />
      </div>
      <h2 className="text-lg font-bold text-text-primary mb-2 font-mono">ACCESS VIOLATION (ACCESS DENIED)</h2>
      <p className="text-sm text-text-secondary max-w-md mb-6 leading-relaxed">
        Your current credentials do not grant access to this secure path. 
        {requiredRoles && ` Required roles: [${requiredRoles.join(', ')}].`}
      </p>
      <Link
        href="/login"
        className="px-4 py-2 rounded-xl text-xs font-semibold bg-surface border border-border-bright text-text-primary transition-colors"
      >
        Authenticate Again
      </Link>
    </div>
  );
}
