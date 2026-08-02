'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageShellProps {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function PageShell({ title, subtitle, actions, children, className }: PageShellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className={`flex flex-col gap-6 p-6 h-full ${className ?? ''}`}
    >
      {(title || actions) && (
        <div className="flex items-start justify-between gap-4">
          {title && (
            <div>
              <h2
                className="text-xl font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                {title}
              </h2>
              {subtitle && (
                <p
                  className="text-sm mt-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {actions && (
            <div className="flex items-center gap-2 flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
      )}

      <div className="flex-1 min-h-0">{children}</div>
    </motion.div>
  );
}
