'use client';

import React from 'react';
import type { AuditLog } from '@/types/audit';
import { Clock, ShieldAlert, Key, Activity, RefreshCw } from 'lucide-react';

interface AuditTimelineProps {
  logs: AuditLog[];
}

export function AuditTimeline({ logs }: AuditTimelineProps) {
  const getIcon = (action: string) => {
    if (action.includes('SCHEDULER') || action.includes('ALGORITHM')) return <RefreshCw className="w-3.5 h-3.5 text-warning" />;
    if (action.includes('CAPACITY')) return <Activity className="w-3.5 h-3.5 text-success" />;
    if (action.includes('LOGIN') || action.includes('LOGOUT')) return <Key className="w-3.5 h-3.5 text-primary" />;
    return <ShieldAlert className="w-3.5 h-3.5 text-text-muted" />;
  };

  return (
    <div className="card-os p-5 border border-border space-y-4 font-mono text-xs">
      <div className="flex items-center gap-2 border-b border-border/60 pb-3">
        <Clock className="w-4.5 h-4.5 text-primary animate-pulse" />
        <span className="font-bold text-text-primary uppercase tracking-wider">REALTIME AUDIT FEED</span>
      </div>

      <div className="relative pl-4 border-l border-border/40 space-y-5 max-h-[460px] overflow-y-auto pr-1">
        {logs.length === 0 ? (
          <p className="text-[10px] text-text-muted text-center py-6">No events captured in loop.</p>
        ) : (
          logs.slice(0, 8).map((log) => (
            <div key={log.id} className="relative space-y-1">
              <div className="absolute -left-7 top-0.5 w-5 h-5 rounded-full bg-surface border border-border flex items-center justify-center">
                {getIcon(log.action)}
              </div>
              <div className="flex justify-between items-start gap-3">
                <span className="font-bold text-text-primary uppercase tracking-wide text-[9px]">{log.action}</span>
                <span className="text-[8px] text-text-muted">{new Date(log.timestamp).toLocaleTimeString()}</span>
              </div>
              <p className="text-text-secondary text-[10px] truncate max-w-[200px]" title={log.userEmail}>{log.userEmail}</p>
              <div className="text-[9px] text-text-muted bg-surface-elevated/20 p-1.5 border border-border/40 rounded mt-1 font-mono break-words max-w-full">
                {JSON.stringify(log.metadata || (log as any).details || {})}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
