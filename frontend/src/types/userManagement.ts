import type { AccessRole, AuthUser } from './auth';

export interface UserWithDetails extends AuthUser {
  department?: string;
  status: 'ACTIVE' | 'INACTIVE';
  activeSession?: {
    sessionId: string;
    sessionStart: string;
    lastActivity: string;
    device: string;
    status: string;
  } | null;
  lastLogin?: string | null;
}

export interface UserFilters {
  search: string;
  role: string;
  status: string;
}

export interface PermissionEntry {
  role: AccessRole;
  description: string;
  capabilities: string[];
}
