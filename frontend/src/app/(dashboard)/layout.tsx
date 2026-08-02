'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ROLE_ROUTES, ROLE_HOME } from '@/types/auth';
import { SocketProvider } from '@/components/providers/SocketProvider';
import { Sidebar } from '@/components/navigation/Sidebar';
import { TopHeader } from '@/components/navigation/TopHeader';
import { LoadingScreen } from '@/components/shared/LoadingScreen';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { SystemStatusProvider } from '@/contexts/SystemStatusContext';
import { SessionExpiredDialog } from '@/components/common/SessionExpiredDialog';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }
    // Role-based route guard
    const allowedRoles = ROLE_ROUTES[pathname];
    if (allowedRoles && user && !allowedRoles.includes(user.accessRole)) {
      router.replace(ROLE_HOME[user.accessRole] ?? '/settings');
    }
  }, [isAuthenticated, isLoading, pathname, router, user]);

  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) return <LoadingScreen />;

  return (
    <SocketProvider>
      <NotificationProvider>
        <SystemStatusProvider>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </SystemStatusProvider>
      </NotificationProvider>
    </SocketProvider>
  );
}
