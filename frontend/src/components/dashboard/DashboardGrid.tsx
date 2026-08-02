'use client';

import React, { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function DashboardGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", className)}>
      {children}
    </div>
  );
}
