'use client';

import { motion } from 'framer-motion';
import { Cpu, Wifi, WifiOff, AlertTriangle, Clock } from 'lucide-react';
import { useSocket } from '@/hooks/useSocket';
import { useAuth } from '@/hooks/useAuth';
import { cn, formatDuration } from '@/lib/utils';

export function StatusBar() {
  const { isConnected, snapshot, lastDeadlock } = useSocket();
  const { user } = useAuth();

  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return (
    <div
      className="flex items-center justify-between px-4 text-[11px] font-mono flex-shrink-0 border-b"
      style={{
        height: 'var(--statusbar-height)',
        background: 'var(--background-secondary)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-muted)',
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* System identifier */}
        <span
          className="font-semibold tracking-wider uppercase text-[10px]"
          style={{ color: 'var(--primary)' }}
        >
          HospitalOS v1.0
        </span>

        {/* Socket status */}
        <div className="flex items-center gap-1.5">
          {isConnected ? (
            <>
              <span className="status-dot online" />
              <Wifi className="w-3 h-3" style={{ color: 'var(--success)' }} />
              <span style={{ color: 'var(--success)' }}>WS Connected</span>
            </>
          ) : (
            <>
              <span className="status-dot danger" />
              <WifiOff className="w-3 h-3" style={{ color: 'var(--danger)' }} />
              <span style={{ color: 'var(--danger)' }}>WS Offline</span>
            </>
          )}
        </div>

        {/* Active scheduler */}
        {snapshot && (
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3 h-3" style={{ color: 'var(--primary)' }} />
            <span style={{ color: 'var(--text-secondary)' }}>
              {snapshot.activeScheduler}
            </span>
          </div>
        )}

        {/* Deadlock warning */}
        {lastDeadlock && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3 h-3" style={{ color: 'var(--danger)' }} />
            <span style={{ color: 'var(--danger)' }} className="animate-pulse">
              DEADLOCK DETECTED
            </span>
          </motion.div>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Simulation tick */}
        {snapshot && (
          <span style={{ color: 'var(--text-muted)' }}>
            TICK:{' '}
            <span style={{ color: 'var(--text-secondary)' }}>
              {snapshot.tick.toString().padStart(5, '0')}
            </span>
          </span>
        )}

        {/* Queue stats */}
        {snapshot && (
          <span className="hidden xl:inline-flex items-center gap-3" style={{ color: 'var(--text-muted)' }}>
            <span>Running Processes: <span className="font-semibold" style={{ color: 'var(--success)' }}>{snapshot.inTreatment.length}</span></span>
            <span>|</span>
            <span>Ready Queue: <span className="font-semibold" style={{ color: 'var(--warning)' }}>{snapshot.readyQueue.length}</span></span>
            <span>|</span>
            <span>Waiting Queue: <span className="font-semibold" style={{ color: 'var(--info)' }}>{snapshot.stats?.waiting ?? 0}</span></span>
            <span>|</span>
            <span>Completed Processes: <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{snapshot.completed.length}</span></span>
          </span>
        )}

        {/* Access level */}
        <span style={{ color: 'var(--text-muted)' }}>
          ROLE:{' '}
          <span className="font-semibold uppercase" style={{ color: 'var(--info)' }}>
            {user?.accessRole ?? 'Operator'}
          </span>
        </span>

        {/* Clock */}
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span style={{ color: 'var(--text-secondary)' }}>{timeString}</span>
        </div>
      </div>
    </div>
  );
}
