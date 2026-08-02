'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { isTokenValid } from '@/lib/auth';

export function SessionExpiredDialog() {
  const { token, logout, isAuthenticated } = useAuth();
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const interval = setInterval(() => {
      if (!isTokenValid(token)) {
        setExpired(true);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [token, isAuthenticated]);

  const handleReauth = () => {
    setExpired(false);
    logout();
  };

  return (
    <AnimatePresence>
      {expired && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-sm rounded-xl border border-danger-muted bg-surface p-6 text-center shadow-2xl"
          >
            <div className="w-12 h-12 rounded-full bg-danger-muted/20 border border-danger/30 flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-6 h-6 text-danger" />
            </div>
            <h3 className="text-lg font-bold font-mono text-text-primary mb-2">SESSION EXPIRED</h3>
            <p className="text-xs text-text-secondary mb-6 leading-relaxed">
              Your security token has expired. For safety, this terminal must re-validate your access credentials.
            </p>
            <button
              onClick={handleReauth}
              className="w-full py-2.5 rounded-lg bg-danger text-white text-xs font-semibold hover:bg-danger-hover transition-colors"
            >
              Authenticate Terminal
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
