'use client';

import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ClipboardList } from 'lucide-react';
import type { AuditLog } from '@/types/audit';

interface ActivityCardProps {
  logs: AuditLog[];
  loading?: boolean;
}

const FRIENDLY_ACTIONS: Record<string, string> = {
  LOGIN: 'User Logged In',
  LOGOUT: 'User Logged Out',
  REGISTER: 'User Registered',
  PATIENT_CREATED: 'Patient Registered',
  APPOINTMENT_CREATED: 'Appointment Created',
  STAFF_CREATED: 'Doctor Assigned',
  CAPACITY_CHANGED: 'Resource Allocated',
  SCHEDULER_CHANGED: 'Scheduler Changed',
  FILE_UPLOAD: 'Report Uploaded',
  FILE_DOWNLOAD: 'Resource Released',
};

export function ActivityCard({ logs, loading }: ActivityCardProps) {
  if (loading) {
    return (
      <div className="card-os p-4 space-y-3">
        <div className="skeleton h-4 w-1/4 rounded" />
        <div className="skeleton h-12 w-full rounded" />
        <div className="skeleton h-12 w-full rounded" />
      </div>
    );
  }

  return (
    <div className="card-os p-4 border border-border flex flex-col gap-4 font-mono text-xs">
      <div className="flex justify-between items-center pb-2 border-b border-border/60">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-4.5 h-4.5 text-info" />
          <span className="font-bold text-text-primary uppercase">RECENT ACTIVITIES</span>
        </div>
      </div>

      <div className="divide-y divide-border/30 max-h-[220px] overflow-y-auto pr-1">
        {!logs || logs.length === 0 ? (
          <p className="text-[10px] text-text-muted text-center py-6">No recent logs recorded.</p>
        ) : (
          logs.slice(0, 5).map((log) => (
            <div key={log.id} className="py-2.5 flex flex-col gap-1 first:pt-0">
              <div className="flex justify-between items-start gap-3">
                <span className="text-text-secondary font-semibold uppercase text-[10px] tracking-wide text-primary">
                  {FRIENDLY_ACTIONS[log.action] ?? log.action.replace(/_/g, ' ')}
                </span>
                <span className="text-[9px] text-text-muted">
                  {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
                </span>
              </div>
              <p className="text-[11px] text-text-muted leading-relaxed truncate">
                User {log.userEmail} executed action on {log.resourceType ?? 'system'} ({log.resourceId ?? 'global'}).
              </p>
              <div className="text-[9px] text-text-muted flex justify-between mt-0.5">
                <span>UID: {log.userId.slice(0, 8)}...</span>
                <span>Type: {log.resourceType ?? 'SYSTEM'}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default ActivityCard;
