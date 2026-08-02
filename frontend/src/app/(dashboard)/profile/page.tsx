'use client';

import React from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { User, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

import { UnifiedDashboardLayout } from '@/components/layout/RoleLayouts';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <UnifiedDashboardLayout>
      <PageShell
        title="Profile"
        subtitle="Credentials, session statistics & access privileges"
      >
        <div className="max-w-md mx-auto card-os p-6 space-y-6">
          <div className="flex items-center gap-4 border-b border-border pb-4">
            <div className="w-12 h-12 rounded-full bg-primary-muted border border-primary-glow flex items-center justify-center text-primary text-lg font-bold font-mono">
              {user?.email[0].toUpperCase()}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary">{user?.email}</h3>
              <p className="text-xs text-text-muted mt-0.5">UID: {user?.id}</p>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-text-muted">ACCESS ROLE:</span>
              <span className="text-text-primary font-bold">{user?.accessRole}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">PRIVILEGE STATUS:</span>
              <span className="text-primary font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                AUTHORIZED
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">TERMINAL STATUS:</span>
              <span className="text-success font-bold">ONLINE / ATTACHED</span>
            </div>
          </div>
        </div>
      </PageShell>
    </UnifiedDashboardLayout>
  );
}
