'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  UserCheck,
  CalendarDays,
  FolderLock,
  GitCompare,
  ClipboardList,
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity,
  AlertTriangle,
  HeartPulse,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import type { AccessRole } from '@/types/auth';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles: AccessRole[];
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Admin', href: '/admin', icon: LayoutDashboard, roles: ['ADMIN'] },
  { label: 'Doctor', href: '/doctor', icon: Stethoscope, roles: ['DOCTOR', 'ADMIN'] },
  { label: 'Nurse', href: '/nurse', icon: HeartPulse, roles: ['NURSE', 'ADMIN'] },
  { label: 'Receptionist', href: '/receptionist', icon: UserCheck, roles: ['RECEPTIONIST', 'ADMIN'] },
  { label: 'Patient', href: '/patient', icon: Users, roles: ['PATIENT'] },
  { label: 'Comparison', href: '/comparison', icon: GitCompare, roles: ['ADMIN'] },
  { label: 'Audit Log', href: '/audit', icon: ClipboardList, roles: ['ADMIN'] },
  { label: 'Settings', href: '/settings', icon: Settings, roles: ['ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST', 'PATIENT'] },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, hasRole } = useAuth();

  const visibleItems = NAV_ITEMS.filter((item) => hasRole(item.roles));

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 260 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex flex-col flex-shrink-0 h-screen overflow-hidden border-r"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Logo area */}
      <div
        className="flex items-center gap-3 px-4 border-b flex-shrink-0"
        style={{
          height: 'var(--navbar-height)',
          borderColor: 'var(--border)',
        }}
      >
        <div
          className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <Activity className="w-4 h-4 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col min-w-0"
            >
              <span
                className="text-sm font-bold tracking-tight leading-none"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
              >
                HospitalOS
              </span>
              <span
                className="text-[10px] leading-none mt-0.5 truncate"
                style={{ color: 'var(--text-muted)' }}
              >
                {user?.accessRole ?? 'System'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-150 relative overflow-hidden',
                isActive
                  ? 'text-white'
                  : 'text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]',
              )}
              style={
                isActive
                  ? {
                      background: 'var(--primary-muted)',
                      borderLeft: '2px solid var(--primary)',
                    }
                  : {
                      borderLeft: '2px solid transparent',
                    }
              }
            >
              {/* Hover bg */}
              {!isActive && (
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 rounded-lg"
                  style={{ background: 'var(--surface-overlay)' }}
                />
              )}

              <Icon
                className={cn(
                  'w-4 h-4 flex-shrink-0 relative z-10 transition-colors',
                  isActive ? 'text-[color:var(--primary-hover)]' : '',
                )}
              />

              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="text-sm font-medium truncate relative z-10"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Active glow */}
              {isActive && (
                <motion.span
                  layoutId="sidebar-active-glow"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
                  style={{ background: 'var(--primary)' }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="px-2 pb-3 flex-shrink-0">
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg transition-colors duration-150 text-xs font-medium"
          style={{
            color: 'var(--text-muted)',
            background: 'transparent',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-overlay)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
          }}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <AnimatePresence>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Collapse
                </motion.span>
              </AnimatePresence>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
