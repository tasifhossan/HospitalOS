'use client';

import React from 'react';
import type { AuthUser } from '@/types/auth';
import { X, ShieldCheck, Mail, ShieldAlert, Layers } from 'lucide-react';
import { RoleBadge } from './RoleBadge';

interface UserProfileDrawerProps {
  user: AuthUser | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UserProfileDrawer({ user, isOpen, onClose }: UserProfileDrawerProps) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-mono text-xs">
      <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface border-l border-border p-6 flex flex-col gap-6 shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="font-bold text-text-primary uppercase tracking-wider">USER PROFILE INTERROGATION</span>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-surface-elevated rounded border border-border text-text-primary">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* User Details */}
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-surface-elevated/20 border border-border space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-text-primary capitalize text-sm">{user.email.split('@')[0]}</span>
                <RoleBadge role={user.accessRole} />
              </div>
              <div className="flex items-center gap-2 text-text-muted">
                <Mail className="w-3.5 h-3.5" />
                <span>{user.email}</span>
              </div>
            </div>

            {/* Profile specifications */}
            <div className="space-y-2">
              <span className="font-bold text-text-primary uppercase tracking-wider text-[9px] block">Privilege Specifications</span>
              <div className="grid grid-cols-2 gap-3 bg-surface-elevated/10 p-3.5 border border-border rounded-lg text-[10px]">
                <div>
                  <span className="block text-[8px] text-text-muted">USER ID</span>
                  <span className="text-text-primary font-semibold break-all">{user.id}</span>
                </div>
                <div>
                  <span className="block text-[8px] text-text-muted">STAFF ID REFERENCE</span>
                  <span className="text-text-primary font-semibold break-all">{user.staffMemberId || 'N/A'}</span>
                </div>
                <div>
                  <span className="block text-[8px] text-text-muted">PROTECTION DOMAIN</span>
                  <span className="text-text-primary font-semibold">Ring Level {user.accessRole === 'ADMIN' ? 0 : 3}</span>
                </div>
                <div>
                  <span className="block text-[8px] text-text-muted">STATUS</span>
                  <span className="text-success font-bold">VERIFIED</span>
                </div>
              </div>
            </div>

            {/* Actions list */}
            <div className="space-y-3 pt-4 border-t border-border">
              <span className="font-bold text-text-primary uppercase tracking-wider text-[9px] block">Privilege Mutations</span>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center p-2 rounded bg-surface-elevated/10 border border-border">
                  <span className="text-text-muted">Modify Account Role</span>
                  <span className="badge badge-warning text-[9px]">TODO: ASSIGN ROLE</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-surface-elevated/10 border border-border">
                  <span className="text-text-muted">Revoke Registry Token</span>
                  <span className="badge badge-warning text-[9px]">TODO: DEACTIVATE</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-surface-elevated/10 border border-border">
                  <span className="text-text-muted">Reset Credential Hash</span>
                  <span className="badge badge-warning text-[9px]">TODO: PASSWORD RESET</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
