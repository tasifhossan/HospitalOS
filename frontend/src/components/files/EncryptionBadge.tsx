'use client';

import React from 'react';
import { KeyRound, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EncryptionBadgeProps {
  isEncrypted: boolean;
  algo?: string;
}

export function EncryptionBadge({ isEncrypted, algo = 'ENCRYPTED' }: EncryptionBadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold border",
      isEncrypted 
        ? "text-primary border-primary/30 bg-primary/5" 
        : "text-warning border-warning/30 bg-warning/5"
    )}>
      {isEncrypted ? (
        <KeyRound className="w-3 h-3 text-primary animate-pulse" />
      ) : (
        <ShieldAlert className="w-3 h-3 text-warning" />
      )}
      <span>{isEncrypted ? algo : 'PLAINTEXT'}</span>
    </span>
  );
}
export default EncryptionBadge;
