'use client';

import { PageShell } from '@/components/shared/PageShell';
import { Settings, Moon, Sun, Bell, Shield, Wifi } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAuth } from '@/hooks/useAuth';
import { useSocket } from '@/hooks/useSocket';
import { toTitleCase } from '@/lib/utils';

import { UnifiedDashboardLayout } from '@/components/layout/RoleLayouts';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const { isConnected, snapshot } = useSocket();

  const settingSection = (title: string, children: React.ReactNode) => (
    <div className="card-os">
      <h3 className="text-sm font-semibold mb-4 pb-3 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}>
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );

  const settingRow = (label: string, value: React.ReactNode, hint?: string) => (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{label}</p>
        {hint && <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{hint}</p>}
      </div>
      <div className="flex-shrink-0">{value}</div>
    </div>
  );

  return (
    <UnifiedDashboardLayout>
      <PageShell title="Settings" subtitle="Appearance, session, and system preferences">
        <div className="grid lg:grid-cols-2 gap-4">
          {settingSection('Appearance', <>
            {settingRow(
              'Color Theme',
              'hint',
              'Choose between dark and light mode',
            )}
            <div className="flex gap-2">
              {(['dark', 'light'] as const).map((t) => (
                <button
                  key={t}
                  id={`settings-theme-${t}`}
                  onClick={() => setTheme(t)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-all flex-1 justify-center"
                  style={{
                    background: theme === t ? 'var(--primary-muted)' : 'var(--surface-elevated)',
                    color: theme === t ? 'var(--primary-hover)' : 'var(--text-secondary)',
                    borderColor: theme === t ? 'var(--primary-glow)' : 'var(--border)',
                  }}
                >
                  {t === 'dark' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
                  {toTitleCase(t)} Mode
                </button>
              ))}
            </div>
          </>)}

          {settingSection('Session', <>
            {settingRow('User ID', (
              <code className="text-[11px] font-mono px-2 py-1 rounded" style={{ background: 'var(--background)', color: 'var(--primary)' }}>
                {user?.id?.slice(0, 8) ?? '—'}...
              </code>
            ))}
            {settingRow('Email', (
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{user?.email ?? '—'}</span>
            ))}
            {settingRow('Access Role', (
              <span className="badge badge-primary">{user?.accessRole ?? '—'}</span>
            ))}
            {settingRow('Privilege Level', (
              <span className="badge badge-info font-mono">
                {user?.accessRole === 'ADMIN' ? 'Level 0' : user?.accessRole === 'RECEPTIONIST' ? 'Level 1' : user?.accessRole === 'DOCTOR' ? 'Level 2' : user?.accessRole === 'NURSE' ? 'Level 3' : 'Level 4'}
              </span>
            ))}
          </>)}

          {settingSection('System Connection', <>
            {settingRow('WebSocket Status', (
              <div className="flex items-center gap-1.5">
                <span className={`status-dot ${isConnected ? 'online' : 'offline'}`} />
                <span className="text-xs" style={{ color: isConnected ? 'var(--success)' : 'var(--text-muted)' }}>
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            ))}
            {snapshot && settingRow('Active Scheduler', (
              <code className="text-[11px] font-mono px-2 py-1 rounded" style={{ background: 'var(--background)', color: 'var(--primary)' }}>
                {snapshot.activeScheduler}
              </code>
            ))}
            {settingRow('Backend URL', (
              <span className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
                {process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api'}
              </span>
            ))}
          </>)}

          {settingSection('About', <>
            {settingRow('Version', <span className="text-sm font-mono" style={{ color: 'var(--primary)' }}>v1.0.0</span>)}
            {settingRow('Build', <span className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>Next.js 15 · React 19</span>)}
            {settingRow('Kernel', <span className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>Express + Socket.io · Prisma ORM</span>)}
          </>)}
        </div>
      </PageShell>
    </UnifiedDashboardLayout>
  );
}
