'use client';

import React, { type ReactNode } from 'react';
import { Sidebar } from '@/components/navigation/Sidebar';
import { TopHeader } from '@/components/navigation/TopHeader';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { SessionExpiredDialog } from '@/components/common/SessionExpiredDialog';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { AccessDenied } from '@/components/common/CommonStates';

interface RoleLayoutProps {
  children: ReactNode;
  allowedRoles: string[];
  roleTitle: string;
  ring: number;
}

function UnifiedRoleLayout({ children, allowedRoles, roleTitle, ring }: RoleLayoutProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background text-text-primary">
        <span className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !allowedRoles.includes(user.accessRole)) {
    return <AccessDenied requiredRoles={allowedRoles} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background text-text-primary">
      {/* Collapsible Sidebar */}
      <Sidebar />

      {/* Main content frame */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Sticky top header */}
        <TopHeader />

        {/* Dynamic content scrollable pane */}
        <div className="flex-1 overflow-y-auto flex flex-col p-6 space-y-6">
          {/* Breadcrumbs and status indicators */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <Breadcrumb />
            <div className="flex items-center gap-2 font-mono text-[10px] text-text-muted">
              <span className="text-primary-hover font-semibold uppercase">{roleTitle}</span>
            </div>
          </div>

          {/* Page body */}
          <div className="flex-1 min-h-0">
            {children}
          </div>

          {/* Footer */}
          <footer className="border-t border-border pt-4 text-center font-mono text-[10px] text-text-muted flex-shrink-0">
            <span>HospitalOS Terminal Console Session · Secure Control Tunnel</span>
          </footer>
        </div>
      </div>

      {/* Expired status checking */}
      <SessionExpiredDialog />
    </div>
  );
}

// Role specific exported layouts
export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <UnifiedRoleLayout allowedRoles={['ADMIN']} roleTitle="Systems Administrator" ring={0}>
      {children}
    </UnifiedRoleLayout>
  );
}

export function DoctorLayout({ children }: { children: ReactNode }) {
  return (
    <UnifiedRoleLayout allowedRoles={['DOCTOR', 'ADMIN']} roleTitle="Medical Practitioner" ring={2}>
      {children}
    </UnifiedRoleLayout>
  );
}

export function NurseLayout({ children }: { children: ReactNode }) {
  return (
    <UnifiedRoleLayout allowedRoles={['NURSE', 'ADMIN']} roleTitle="Clinical Nurse Station" ring={3}>
      {children}
    </UnifiedRoleLayout>
  );
}

export function ReceptionistLayout({ children }: { children: ReactNode }) {
  return (
    <UnifiedRoleLayout allowedRoles={['RECEPTIONIST', 'ADMIN']} roleTitle="Reception Desk & Queue Manager" ring={1}>
      {children}
    </UnifiedRoleLayout>
  );
}

export function PatientLayout({ children }: { children: ReactNode }) {
  return (
    <UnifiedRoleLayout allowedRoles={['PATIENT']} roleTitle="Patient Self Portal" ring={4}>
      {children}
    </UnifiedRoleLayout>
  );
}

export function UnifiedDashboardLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const ring = user?.accessRole === 'ADMIN' ? 0 : user?.accessRole === 'RECEPTIONIST' ? 1 : user?.accessRole === 'DOCTOR' ? 2 : user?.accessRole === 'NURSE' ? 3 : 4;
  return (
    <UnifiedRoleLayout
      allowedRoles={['ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST', 'PATIENT']}
      roleTitle={`${user?.accessRole ?? 'USER'} Dashboard`}
      ring={ring}
    >
      {children}
    </UnifiedRoleLayout>
  );
}
