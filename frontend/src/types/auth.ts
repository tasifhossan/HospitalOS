export type AccessRole = 'ADMIN' | 'RECEPTIONIST' | 'DOCTOR' | 'NURSE' | 'PATIENT';

export interface AuthUser {
  id: string;
  email: string;
  accessRole: AccessRole;
  staffMemberId?: string | null;
  staffMember?: {
    id: string;
    name: string;
    role: string;
    status: string;
  } | null;
  createdAt?: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  accessRole: AccessRole;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export interface RegisterResponse {
  message: string;
  user: AuthUser;
}

/** Protection ring levels — matches backend security model */
export const ROLE_RING: Record<AccessRole, number> = {
  ADMIN: 0,
  RECEPTIONIST: 1,
  DOCTOR: 2,
  NURSE: 3,
  PATIENT: 4,
};

/** Route access map */
export const ROLE_ROUTES: Record<string, AccessRole[]> = {
  '/admin': ['ADMIN'],
  '/doctor': ['DOCTOR', 'ADMIN'],
  '/nurse': ['NURSE', 'ADMIN'],
  '/receptionist': ['RECEPTIONIST', 'ADMIN'],
  '/patient': ['PATIENT'],
  '/comparison': ['ADMIN'],
  '/audit': ['ADMIN'],
  '/dashboard': ['ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST', 'PATIENT'],
  '/system-monitor': ['ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST'],
  '/scheduling-overview': ['ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST'],
  '/resource-manager': ['ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST'],
  '/secure-file-manager': ['ADMIN', 'DOCTOR', 'NURSE', 'PATIENT'],
  '/user-management': ['ADMIN'],
  '/audit-logs': ['ADMIN'],
  '/system-control': ['ADMIN'],
  '/performance-analytics': ['ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST', 'PATIENT'],
  '/profile': ['ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST', 'PATIENT'],
  '/settings': ['ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST', 'PATIENT'],
};

/** Default redirect per role after login */
export const ROLE_HOME: Record<AccessRole, string> = {
  ADMIN: '/admin',
  DOCTOR: '/doctor',
  NURSE: '/nurse',
  RECEPTIONIST: '/receptionist',
  PATIENT: '/patient',
};
