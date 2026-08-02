'use client';

import React from 'react';
import type { AccessRole } from '@/types/auth';

interface RoleBadgeProps {
  role: AccessRole;
  className?: string;
}

export function RoleBadge({ role, className = '' }: RoleBadgeProps) {
  const styles: Record<AccessRole, string> = {
    ADMIN: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    DOCTOR: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    NURSE: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    RECEPTIONIST: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    PATIENT: 'bg-gray-500/10 border-gray-500/30 text-gray-400',
  };

  return (
    <span
      className={`px-2 py-0.5 rounded text-[10px] font-mono border font-semibold tracking-wider ${styles[role] || styles.PATIENT} ${className}`}
    >
      {role}
    </span>
  );
}
