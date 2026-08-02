'use client';

import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PermissionBadgeProps {
  role: string;
  hasAccess: boolean;
}

export function PermissionBadge({ role, hasAccess }: PermissionBadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold border",
      hasAccess 
        ? "text-success border-success/30 bg-success/5" 
        : "text-danger border-danger/30 bg-danger/5"
    )}>
      {hasAccess ? (
        <ShieldCheck className="w-3 h-3 text-success" />
      ) : (
        <Lock className="w-3 h-3 text-danger" />
      )}
      <span>{hasAccess ? 'ALLOWED' : 'DENIED'}</span>
    </span>
  );
}
export default PermissionBadge;
