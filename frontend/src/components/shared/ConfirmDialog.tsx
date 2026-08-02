'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import type { ReactNode } from 'react';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  variant?: 'danger' | 'warning' | 'primary';
  loading?: boolean;
  children?: ReactNode;
}

const VARIANT_CONFIG = {
  danger: {
    iconBg: 'var(--danger-muted)',
    iconColor: 'var(--danger)',
    btnBg: 'var(--danger)',
    btnHover: '#dc2626',
  },
  warning: {
    iconBg: 'var(--warning-muted)',
    iconColor: 'var(--warning)',
    btnBg: 'var(--warning)',
    btnHover: '#d97706',
  },
  primary: {
    iconBg: 'var(--primary-muted)',
    iconColor: 'var(--primary)',
    btnBg: 'var(--primary)',
    btnHover: 'var(--primary-hover)',
  },
};

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  variant = 'danger',
  loading = false,
  children,
}: ConfirmDialogProps) {
  const cfg = VARIANT_CONFIG[variant];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
            onClick={() => onOpenChange(false)}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md rounded-2xl border p-6 shadow-2xl"
            style={{
              background: 'var(--surface-elevated)',
              borderColor: 'var(--border-bright)',
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
          >
            {/* Close */}
            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
              style={{ background: cfg.iconBg }}
            >
              <AlertTriangle className="w-5 h-5" style={{ color: cfg.iconColor }} />
            </div>

            {/* Content */}
            <h2
              id="confirm-dialog-title"
              className="text-lg font-semibold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              {title}
            </h2>
            {description && (
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                {description}
              </p>
            )}

            {children && <div className="mb-4">{children}</div>}

            {/* Actions */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => onOpenChange(false)}
                disabled={loading}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors disabled:opacity-50"
                style={{
                  background: 'transparent',
                  borderColor: 'var(--border-bright)',
                  color: 'var(--text-secondary)',
                }}
              >
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white transition-opacity disabled:opacity-60"
                style={{ background: cfg.btnBg }}
              >
                {loading ? 'Processing...' : confirmLabel}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
