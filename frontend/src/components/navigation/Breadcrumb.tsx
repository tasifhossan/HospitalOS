'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { toTitleCase } from '@/lib/utils';

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav className="flex items-center gap-1.5 text-xs font-mono text-text-secondary select-none" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
        <Home className="w-3.5 h-3.5" />
        <span>kernel</span>
      </Link>
      {segments.map((segment, index) => {
        const url = `/${segments.slice(0, index + 1).join('/')}`;
        const isLast = index === segments.length - 1;

        return (
          <React.Fragment key={url}>
            <ChevronRight className="w-3 h-3 text-text-muted" />
            {isLast ? (
              <span className="text-text-primary font-medium">{toTitleCase(segment)}</span>
            ) : (
              <Link href={url} className="hover:text-primary transition-colors">
                {toTitleCase(segment)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
