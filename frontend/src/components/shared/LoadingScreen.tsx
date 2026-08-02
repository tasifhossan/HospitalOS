'use client';

import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50 grid-overlay"
      style={{ background: 'var(--background)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--gradient-glow)' }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="flex flex-col items-center gap-6 relative z-10"
      >
        {/* Logo mark */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: 'var(--gradient-primary)', boxShadow: 'var(--shadow-glow-primary)' }}
        >
          <Activity className="w-7 h-7 text-white" />
        </motion.div>

        {/* Title */}
        <div className="text-center">
          <h1
            className="text-2xl font-bold tracking-tight font-mono"
            style={{ color: 'var(--text-primary)' }}
          >
            HospitalOS
          </h1>
          <p
            className="text-sm mt-1 font-mono"
            style={{ color: 'var(--text-muted)' }}
          >
            Adaptive Resource Scheduling
          </p>
        </div>

        {/* Progress bar */}
        <div
          className="w-48 h-0.5 rounded-full overflow-hidden"
          style={{ background: 'var(--border)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'var(--gradient-primary)' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
          />
        </div>

        {/* Boot messages */}
        <div
          className="text-[11px] font-mono text-center space-y-1"
          style={{ color: 'var(--text-muted)' }}
        >
          {['Initializing kernel...', 'Loading scheduler...', 'Connecting to services...'].map(
            (msg, i) => (
              <motion.p
                key={msg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.3 }}
              >
                {msg}
              </motion.p>
            ),
          )}
        </div>
      </motion.div>
    </div>
  );
}
