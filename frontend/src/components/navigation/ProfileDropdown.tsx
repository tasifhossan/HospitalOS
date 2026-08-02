'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { getInitials, stringToColor } from '@/lib/utils';
import { User, Settings, Lock, LogOut, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ProfileDropdown() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const initials = getInitials(user.email);
  const avatarColor = stringToColor(user.email);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 p-1 rounded-lg hover:bg-surface-overlay transition-colors select-none text-left"
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
          style={{ background: avatarColor }}
        >
          {initials}
        </div>
        <div className="hidden sm:flex flex-col leading-none">
          <span className="text-xs font-semibold text-text-primary">{user.email.split('@')[0]}</span>
          <span className="text-[10px] text-text-muted mt-0.5 uppercase tracking-wider">{user.accessRole}</span>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-surface p-1 shadow-lg z-50 font-mono text-xs"
          >
            <div className="px-3 py-2 border-b border-border mb-1">
              <p className="text-[10px] text-text-muted">AUTHENTICATED RING</p>
              <p className="font-semibold text-text-primary truncate">{user.email}</p>
            </div>
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-surface-overlay text-text-secondary hover:text-text-primary transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Link>
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-surface-overlay text-text-secondary hover:text-text-primary transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>
            <Link
              href="/profile?action=password"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-surface-overlay text-text-secondary hover:text-text-primary transition-colors"
            >
              <Lock className="w-4 h-4" />
              <span>Change Password</span>
            </Link>
            <div className="h-px bg-border my-1" />
            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="flex w-full items-center gap-2 px-3 py-2 rounded-md hover:bg-danger-muted text-text-secondary hover:text-danger transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
