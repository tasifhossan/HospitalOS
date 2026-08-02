'use client';

import type { ReactNode, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// ─── Base input styles ─────────────────────────────────────────────────────────
const inputBase = [
  'w-full px-3 py-2.5 rounded-lg border text-sm outline-none',
  'transition-all duration-150',
  'placeholder:text-[color:var(--text-muted)]',
].join(' ');

const inputStyle = {
  background: 'var(--background)',
  borderColor: 'var(--border)',
  color: 'var(--text-primary)',
};

// ─── FormField wrapper ─────────────────────────────────────────────────────────
interface FormFieldProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export function FormField({ label, error, hint, required, children, className }: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: 'var(--text-secondary)' }}
        >
          {label}
          {required && <span className="ml-0.5" style={{ color: 'var(--danger)' }}>*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-[11px] font-mono" style={{ color: 'var(--danger)' }}>
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
          {hint}
        </p>
      )}
    </div>
  );
}

// ─── TextInput ────────────────────────────────────────────────────────────────
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function TextInput({ className, error, style, ...props }: TextInputProps) {
  return (
    <input
      className={cn(inputBase, error && 'border-[color:var(--danger)]', className)}
      style={{ ...inputStyle, ...(error ? { borderColor: 'var(--danger)' } : {}), ...style }}
      {...props}
    />
  );
}

// ─── SelectInput ──────────────────────────────────────────────────────────────
interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function SelectInput({ options, placeholder, className, error, style, ...props }: SelectInputProps) {
  return (
    <select
      className={cn(inputBase, error && 'border-[color:var(--danger)]', className)}
      style={{ ...inputStyle, ...(error ? { borderColor: 'var(--danger)' } : {}), ...style }}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} style={{ background: 'var(--surface)' }}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

// ─── TextareaInput ─────────────────────────────────────────────────────────────
interface TextareaInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function TextareaInput({ className, error, style, ...props }: TextareaInputProps) {
  return (
    <textarea
      className={cn(inputBase, 'resize-none', error && 'border-[color:var(--danger)]', className)}
      style={{ ...inputStyle, ...(error ? { borderColor: 'var(--danger)' } : {}), ...style }}
      rows={3}
      {...props}
    />
  );
}

// ─── OsButton ─────────────────────────────────────────────────────────────────
interface OsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
}

const BTN_VARIANTS = {
  primary: {
    background: 'var(--primary)',
    color: '#fff',
    border: '1px solid transparent',
  },
  secondary: {
    background: 'var(--surface-elevated)',
    color: 'var(--text-secondary)',
    border: '1px solid var(--border-bright)',
  },
  danger: {
    background: 'var(--danger-muted)',
    color: 'var(--danger)',
    border: '1px solid #ef444430',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-secondary)',
    border: '1px solid transparent',
  },
};

const BTN_SIZES = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-sm',
};

export function OsButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  className,
  disabled,
  style,
  ...props
}: OsButtonProps) {
  const vstyle = BTN_VARIANTS[variant];

  return (
    <button
      className={cn(
        'flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed',
        BTN_SIZES[size],
        className,
      )}
      style={{ ...vstyle, ...style }}
      disabled={disabled ?? loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon}
      {children}
    </button>
  );
}
