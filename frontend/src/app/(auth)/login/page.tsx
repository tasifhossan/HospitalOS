'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Activity, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { getApiError } from '@/lib/api';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setSubmitting(true);
    try {
      await login(data);
      toast.success('Access granted', 'Redirecting to your dashboard...');
    } catch (err) {
      toast.error('Authentication failed', getApiError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 grid-overlay"
      style={{ background: 'var(--background)' }}
    >
      {/* Ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'var(--gradient-glow)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-[400px] relative z-10"
      >
        {/* Card */}
        <div
          className="rounded-2xl border p-8"
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--border-bright)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
              style={{ background: 'var(--gradient-primary)', boxShadow: 'var(--shadow-glow-primary)' }}
            >
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h1
              className="text-lg font-bold font-mono tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              HospitalOS
            </h1>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              Authenticate to access your dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="login-email"
                className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="admin@hospital.local"
                className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all focus:border-[color:var(--primary)]"
                style={{
                  background: 'var(--background)',
                  borderColor: errors.email ? 'var(--danger)' : 'var(--border)',
                  color: 'var(--text-primary)',
                }}
                {...register('email')}
              />
              {errors.email && (
                <p className="text-[11px] font-mono" style={{ color: 'var(--danger)' }}>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="login-password"
                className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 pr-10 rounded-lg border text-sm outline-none transition-all focus:border-[color:var(--primary)]"
                  style={{
                    background: 'var(--background)',
                    borderColor: errors.password ? 'var(--danger)' : 'var(--border)',
                    color: 'var(--text-primary)',
                  }}
                  {...register('password')}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] font-mono" style={{ color: 'var(--danger)' }}>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={submitting || isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all mt-2 disabled:opacity-60"
              style={{ background: 'var(--gradient-primary)', boxShadow: 'var(--shadow-glow-primary)' }}
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Initialize Session
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Ring notice */}
          <div
            className="mt-6 flex items-start gap-2 p-3 rounded-lg text-[11px]"
            style={{
              background: 'var(--background)',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
            }}
          >
            <Shield className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: 'var(--info)' }} />
            <span>
              Access is governed by secure privilege levels. Your role determines which resources and dashboards are accessible.
            </span>
          </div>
        </div>

        {/* Back to landing */}
        <div className="text-center mt-4">
          <Link
            href="/"
            className="text-xs transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            ← Back to landing
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
