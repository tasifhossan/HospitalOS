'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[GlobalError]', error);
  }, [error]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center p-8 grid-overlay"
      style={{ background: 'var(--background)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-5 max-w-md text-center"
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: 'var(--danger-muted)', boxShadow: 'var(--shadow-glow-danger)' }}
        >
          <AlertTriangle className="w-7 h-7" style={{ color: 'var(--danger)' }} />
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            System Error
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            An unexpected error occurred. The kernel has caught an unhandled exception.
          </p>
          {error.message && (
            <code
              className="block text-[11px] font-mono mt-3 px-3 py-2 rounded-lg break-all"
              style={{
                background: 'var(--surface)',
                color: 'var(--danger)',
                border: '1px solid var(--border)',
              }}
            >
              {error.message}
            </code>
          )}
          {error.digest && (
            <p className="text-[10px] mt-1 font-mono" style={{ color: 'var(--text-muted)' }}>
              Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
            style={{
              background: 'var(--primary-muted)',
              color: 'var(--primary-hover)',
              border: '1px solid var(--primary-glow)',
            }}
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
            style={{
              background: 'var(--surface-elevated)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-bright)',
            }}
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
