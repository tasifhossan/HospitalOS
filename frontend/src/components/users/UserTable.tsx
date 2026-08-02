'use client';

import React from 'react';
import type { AuthUser } from '@/types/auth';
import { RoleBadge } from './RoleBadge';
import { ShieldCheck, Trash2, Eye, UserMinus, ShieldAlert, Key } from 'lucide-react';

interface UserTableProps {
  users: AuthUser[];
  onView: (user: AuthUser) => void;
  onDelete: (id: string) => void;
}

export function UserTable({ users, onView, onDelete }: UserTableProps) {
  // Derive department from user role
  const getDepartment = (role: string) => {
    if (role === 'DOCTOR') return 'General Medicine';
    if (role === 'NURSE') return 'Critical Care';
    if (role === 'RECEPTIONIST') return 'Emergency Desk';
    if (role === 'ADMIN') return 'Operations Center';
    return 'Outpatient Clinic';
  };

  return (
    <div className="card-os p-0 border border-border overflow-hidden font-mono text-xs">
      <div className="p-4 border-b border-border bg-surface-elevated/10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4.5 h-4.5 text-primary" />
          <span className="font-bold text-text-primary uppercase tracking-wider">SYSTEM ACCOUNTS REGISTRY</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-surface-elevated text-[9px] text-text-muted">
          RING PROTECTION ROSTER
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border/60 bg-surface-elevated/5 text-[9px] uppercase tracking-wider text-text-muted">
              <th className="py-3 px-4 font-bold">Account (Email)</th>
              <th className="py-3 px-4 font-bold">Ring Role</th>
              <th className="py-3 px-4 font-bold">Department</th>
              <th className="py-3 px-4 font-bold">Status</th>
              <th className="py-3 px-4 font-bold text-center">Active Session</th>
              <th className="py-3 px-4 font-bold">Last Login</th>
              <th className="py-3 px-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-text-muted text-[10px]">
                  No active users found in Registry.
                </td>
              </tr>
            ) : (
              users.map((u) => {
                const username = u.email.split('@')[0];
                return (
                  <tr key={u.id} className="hover:bg-surface-elevated/25 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-text-primary">
                      <div className="flex flex-col min-w-0">
                        <span className="capitalize">{username}</span>
                        <span className="text-[9px] text-text-muted mt-0.5 font-normal">{u.email}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <RoleBadge role={u.accessRole} />
                    </td>
                    <td className="py-3.5 px-4 text-text-secondary font-medium">
                      {getDepartment(u.accessRole)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="flex items-center gap-1 text-[9px] font-bold text-success">
                        <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                        <span>ACTIVE</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-1.5 py-0.5 rounded text-[8px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                        ONLINE
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-text-muted">
                      {u.createdAt ? new Date(u.createdAt).toLocaleString() : 'Just now'}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex justify-end gap-2 items-center">
                        <button
                          onClick={() => onView(u)}
                          className="p-1 border border-border rounded hover:bg-surface-elevated text-text-primary transition-all"
                          title="View Profile Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDelete(u.id)}
                          className="p-1 border border-danger/20 hover:border-danger/40 rounded hover:bg-danger/10 text-danger transition-all"
                          title="Deallocate Account"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <span className="badge badge-warning text-[8px] scale-90" title="Actions pending backend endpoints">
                          Pending API
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
