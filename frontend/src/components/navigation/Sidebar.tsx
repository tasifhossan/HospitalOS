'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Activity,
  BarChart3,
  Cpu,
  FolderLock,
  Users,
  ClipboardList,
  Sliders,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'System Monitor', href: '/system-monitor', icon: Activity },
  { label: 'Scheduling Overview', href: '/scheduling-overview', icon: BarChart3 },
  { label: 'Resource Manager', href: '/resource-manager', icon: Cpu },
  { label: 'Secure File Manager', href: '/secure-file-manager', icon: FolderLock },
  { label: 'User Management', href: '/user-management', icon: Users },
  { label: 'Audit Logs', href: '/audit-logs', icon: ClipboardList },
  { label: 'System Control', href: '/system-control', icon: Sliders },
  { label: 'Performance Analytics', href: '/performance-analytics', icon: BarChart3 },
  { label: 'Profile', href: '/profile', icon: User },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 260 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="relative flex flex-col flex-shrink-0 h-screen overflow-hidden border-r border-border bg-surface"
    >
      {/* Brand logo & active role privilege indicator */}
      <div
        className="flex items-center gap-3 px-4 border-b border-border flex-shrink-0"
        style={{ height: 'var(--navbar-height)' }}
      >
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-primary flex-shrink-0">
          <Activity className="w-4.5 h-4.5 text-white animate-pulse" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col min-w-0"
            >
              <span className="text-xs font-black font-mono tracking-wider uppercase text-text-primary leading-none">
                HospitalOS
              </span>
              <span className="text-[9px] text-text-muted mt-1 flex items-center gap-1 font-mono uppercase">
                <ShieldCheck className="w-2.5 h-2.5 text-primary" />
                {user?.accessRole ?? 'Operator'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main navigation item links */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all text-xs font-mono relative overflow-hidden',
                isActive
                  ? 'text-white bg-primary-muted border-l-2 border-primary font-semibold'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-overlay'
              )}
            >
              <Icon className={cn('w-4.5 h-4.5 flex-shrink-0', isActive ? 'text-primary-hover' : 'text-text-muted')} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="truncate"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer collapse and logout buttons */}
      <div className="p-2 border-t border-border flex flex-col gap-1 flex-shrink-0">
        <button
          onClick={logout}
          title={collapsed ? "Logout" : undefined}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-mono text-text-muted hover:text-danger hover:bg-danger-muted/20 transition-all"
        >
          <LogOut className="w-4.5 h-4.5 flex-shrink-0 text-text-muted" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center py-2 rounded-md text-text-muted hover:bg-surface-overlay transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </motion.aside>
  );
}
export default Sidebar;
