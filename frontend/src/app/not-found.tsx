import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
};

export default function NotFound() {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center p-8 grid-overlay font-mono"
      style={{ background: 'var(--background)' }}
    >
      <div className="flex flex-col items-center gap-6 max-w-md text-center">
        {/* Glitch number */}
        <div className="relative">
          <span
            className="text-[120px] font-black leading-none select-none"
            style={{ color: 'var(--primary)', opacity: 0.15 }}
          >
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-5xl font-black tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              404
            </span>
          </div>
        </div>

        <div>
          <h1
            className="text-xl font-bold mb-2"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
          >
            PROCESS NOT FOUND
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'Inter, sans-serif' }}>
            The requested route does not exist in the HospitalOS kernel registry.
          </p>
        </div>

        <div
          className="w-full rounded-lg border px-4 py-3 text-left text-[11px]"
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--border)',
            color: 'var(--success)',
          }}
        >
          <span style={{ color: 'var(--text-muted)' }}>kernel</span>
          <span style={{ color: 'var(--primary)' }}> &gt; </span>
          <span>ERROR: 0x80000404 — Route entry missing</span>
          <br />
          <span style={{ color: 'var(--text-muted)' }}>kernel</span>
          <span style={{ color: 'var(--primary)' }}> &gt; </span>
          <span style={{ color: 'var(--warning)' }}>Suggest: navigate to a valid process</span>
        </div>

        <div className="flex gap-3">
          <Link
            href="/"
            className="px-4 py-2.5 rounded-xl text-sm font-medium"
            style={{
              background: 'var(--gradient-primary)',
              color: '#fff',
            }}
          >
            ← Return to Landing
          </Link>
          <Link
            href="/login"
            className="px-4 py-2.5 rounded-xl text-sm font-medium"
            style={{
              background: 'var(--surface-elevated)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-bright)',
            }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
