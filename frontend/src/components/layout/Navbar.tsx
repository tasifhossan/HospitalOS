'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bell, LogOut, Moon, Sun, Search } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAuth } from '@/hooks/useAuth';
import { getInitials, stringToColor, toTitleCase } from '@/lib/utils';

const PAGE_TITLES: Record<string, string> = {
  '/admin': 'Admin Dashboard',
  '/doctor': 'Doctor Portal',
  '/nurse': 'Nurse Station',
  '/receptionist': 'Reception Desk',
  '/patient': 'Patient Portal',
  '/comparison': 'Algorithm Comparison',
  '/audit': 'Audit Log',
  '/settings': 'Settings',
};

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const title = PAGE_TITLES[pathname] ?? 'HospitalOS';
  const initials = getInitials(user?.email ?? 'HO');
  const avatarColor = stringToColor(user?.email ?? 'HospitalOS');

  return (
    <motion.header
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-between px-5 border-b flex-shrink-0"
      style={{
        height: 'var(--navbar-height)',
        background: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Left — Page title */}
      <div className="flex items-center gap-3">
        <div>
          <h1
            className="text-sm font-semibold leading-none"
            style={{ color: 'var(--text-primary)' }}
          >
            {title}
          </h1>
          <p
            className="text-[11px] mt-0.5 font-mono"
            style={{ color: 'var(--text-muted)' }}
          >
            {pathname}
          </p>
        </div>
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-1">
        {/* Search placeholder */}
        <button
          id="navbar-search-btn"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors text-xs"
          style={{
            color: 'var(--text-muted)',
            background: 'var(--surface-overlay)',
            border: '1px solid var(--border)',
          }}
          title="Search"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Search...</span>
          <kbd
            className="hidden sm:inline-flex items-center px-1.5 rounded text-[10px] font-mono"
            style={{ background: 'var(--border)', color: 'var(--text-muted)' }}
          >
            ⌘K
          </kbd>
        </button>

        {/* Theme toggle */}
        <button
          id="navbar-theme-toggle"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-lg transition-colors"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-overlay)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
          }}
          title="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications */}
        <button
          id="navbar-notifications-btn"
          className="relative p-2 rounded-lg transition-colors"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-overlay)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
          }}
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
            style={{ background: 'var(--danger)' }}
          />
        </button>

        {/* Divider */}
        <div
          className="w-px h-5 mx-1"
          style={{ background: 'var(--border)' }}
        />

        {/* User avatar + info */}
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
            style={{ background: avatarColor }}
          >
            {initials}
          </div>
          <div className="hidden md:flex flex-col leading-none">
            <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
              {user?.email?.split('@')[0] ?? 'User'}
            </span>
            <span
              className="text-[10px] font-mono mt-0.5"
              style={{ color: 'var(--text-muted)' }}
            >
              {user?.accessRole ? toTitleCase(user.accessRole) : 'Guest'}
            </span>
          </div>
        </div>

        {/* Logout */}
        <button
          id="navbar-logout-btn"
          onClick={logout}
          className="p-2 rounded-lg transition-colors ml-1"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--danger-muted)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--danger)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
          }}
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </motion.header>
  );
}
