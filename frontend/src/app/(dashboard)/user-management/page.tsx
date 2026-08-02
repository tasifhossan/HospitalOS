'use client';

import React, { useEffect, useState } from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { UnifiedDashboardLayout } from '@/components/layout/RoleLayouts';
import { UserTable } from '@/components/users/UserTable';
import { UserProfileDrawer } from '@/components/users/UserProfileDrawer';
import { PermissionMatrix } from '@/components/users/PermissionMatrix';
import { SessionCard } from '@/components/users/SessionCard';
import { adminService } from '@/services/adminService';
import type { AuthUser } from '@/types/auth';
import { Users, Plus, CheckCircle, XCircle } from 'lucide-react';

export default function UserManagementPage() {
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<AuthUser | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // User Provisioning states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'DOCTOR' | 'NURSE' | 'RECEPTIONIST' | 'ADMIN' | 'PATIENT'>('DOCTOR');
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUsers = () => {
    adminService.listUsers()
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email and Password are required for provisioning.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await adminService.createUser({
        email,
        password,
        accessRole: role,
      });
      setMessage(`User account ${email} successfully provisioned inside Registry.`);
      setEmail('');
      setPassword('');
      fetchUsers();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to provision user.');
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage('');
        setError('');
      }, 4000);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to deallocate this user?')) return;
    try {
      await adminService.deleteUser(id);
      setMessage('User account deallocated successfully.');
      fetchUsers();
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setError('Failed to delete user.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleViewUser = (user: AuthUser) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  return (
    <UnifiedDashboardLayout>
      <PageShell
        title="User Management"
        subtitle="Identity protection, role privilege configurations & registry access controls"
      >
        <div className="space-y-6">
          {message && (
            <div className="p-3 border border-success/30 bg-success/10 text-success rounded-lg font-mono text-xs flex items-center gap-2">
              <CheckCircle className="w-4.5 h-4.5" />
              <span>{message}</span>
            </div>
          )}
          {error && (
            <div className="p-3 border border-danger/30 bg-danger/10 text-danger rounded-lg font-mono text-xs flex items-center gap-2">
              <XCircle className="w-4.5 h-4.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Users list & Permission matrix */}
            <div className="lg:col-span-2 space-y-6">
              <UserTable
                users={users}
                onView={handleViewUser}
                onDelete={handleDeleteUser}
              />
              <PermissionMatrix />
            </div>

            {/* Right Column: User provisioning & active sessions */}
            <div className="space-y-6">
              {/* Provisioning form */}
              <div className="card-os p-5 border border-border space-y-4 font-mono text-xs">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <Plus className="w-4.5 h-4.5 text-primary" />
                  <span className="font-bold text-text-primary uppercase">Provision User Account</span>
                </div>
                <form onSubmit={handleCreateUser} className="space-y-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] text-text-muted">Account Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. nurse@hospital.local"
                      className="bg-surface-elevated border border-border p-2 rounded outline-none text-text-primary focus:border-primary/50"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] text-text-muted">Temporary Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-surface-elevated border border-border p-2 rounded outline-none text-text-primary focus:border-primary/50"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] text-text-muted">Access Privilege Level</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as any)}
                      className="bg-surface-elevated border border-border p-2 rounded outline-none text-text-primary focus:border-primary/50"
                    >
                      <option value="ADMIN">ADMIN</option>
                      <option value="DOCTOR">DOCTOR</option>
                      <option value="NURSE">NURSE</option>
                      <option value="RECEPTIONIST">RECEPTIONIST</option>
                      <option value="PATIENT">PATIENT</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 py-2 bg-primary hover:bg-primary-hover text-white font-semibold rounded transition-all"
                  >
                    Provision Account
                  </button>
                </form>
              </div>

              {/* Active Sessions list */}
              <div className="card-os p-5 border border-border space-y-4 font-mono text-xs">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <Users className="w-4.5 h-4.5 text-primary" />
                  <span className="font-bold text-text-primary uppercase">ACTIVE SESSION LIST</span>
                </div>
                <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                  <SessionCard
                    email="admin@hospital.local"
                    role="ADMIN"
                    sessionStart={new Date().toLocaleTimeString()}
                    lastActivity="Just now"
                    device="Chrome / Windows 11"
                    status="ACTIVE"
                  />
                  {users.slice(0, 3).map((u) => (
                    <SessionCard
                      key={u.id}
                      email={u.email}
                      role={u.accessRole}
                      sessionStart={new Date(Date.now() - 3600000).toLocaleTimeString()}
                      lastActivity="5m ago"
                      device="Safari / macOS"
                      status="ACTIVE"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Drawer details */}
        <UserProfileDrawer
          user={selectedUser}
          isOpen={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
            setSelectedUser(null);
          }}
        />
      </PageShell>
    </UnifiedDashboardLayout>
  );
}
