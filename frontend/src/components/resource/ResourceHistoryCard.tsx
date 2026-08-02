'use client';

import React from 'react';
import { History, Check, X, Shuffle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HistoryItem {
  id: string;
  resourceName: string;
  action: 'Allocated' | 'Released' | 'Cancelled' | 'Transferred';
  timestamp: string;
  userEmail: string;
}

interface ResourceHistoryCardProps {
  history: HistoryItem[];
}

export function ResourceHistoryCard({ history }: ResourceHistoryCardProps) {
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'Allocated':
        return <Check className="w-3.5 h-3.5 text-success" />;
      case 'Released':
        return <Shuffle className="w-3.5 h-3.5 text-primary" />;
      case 'Cancelled':
        return <X className="w-3.5 h-3.5 text-danger" />;
      default:
        return <AlertCircle className="w-3.5 h-3.5 text-warning" />;
    }
  };

  return (
    <div className="card-os p-4 border border-border flex flex-col gap-4 font-mono text-xs">
      <div className="flex justify-between items-center pb-2 border-b border-border/60">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-info" />
          <span className="font-bold text-text-primary uppercase">RESOURCE HISTORICAL LOG</span>
        </div>
      </div>

      <div className="divide-y divide-border/30 max-h-[220px] overflow-y-auto pr-1">
        {history.length === 0 ? (
          <p className="text-[10px] text-text-muted text-center py-8 font-mono">No historical operations logged.</p>
        ) : (
          history.map((log) => (
            <div key={log.id} className="py-2 flex items-center justify-between gap-3 text-[10px]">
              <div className="flex items-center gap-2">
                {getActionIcon(log.action)}
                <div className="flex flex-col">
                  <span className="text-text-primary font-semibold">{log.resourceName}</span>
                  <span className="text-[9px] text-text-muted">{log.userEmail}</span>
                </div>
              </div>
              <div className="flex flex-col items-end text-right">
                <span className={cn(
                  "font-bold uppercase text-[9px]",
                  log.action === 'Allocated' ? 'text-success' :
                  log.action === 'Released' ? 'text-primary' :
                  log.action === 'Cancelled' ? 'text-danger' : 'text-warning'
                )}>
                  {log.action}
                </span>
                <span className="text-[8px] text-text-muted mt-0.5">{log.timestamp}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default ResourceHistoryCard;
