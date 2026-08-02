import { jwtDecode } from 'jwt-decode';
import type { AccessRole, AuthUser } from '@/types/auth';

const TOKEN_KEY = 'hospitalos:token';
const USER_KEY = 'hospitalos:user';

interface JWTPayload {
  id: string;
  email: string;
  accessRole: AccessRole;
  iat: number;
  exp: number;
}

/** Decode JWT and return payload, or null on error */
export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwtDecode<JWTPayload>(token);
  } catch {
    return null;
  }
}

/** Check if a JWT token is still valid (not expired) */
export function isTokenValid(token: string): boolean {
  const payload = decodeToken(token);
  if (!payload) return false;
  // exp is in seconds, Date.now() in ms
  return payload.exp * 1000 > Date.now();
}

/** Persist auth data to localStorage */
export function persistAuth(token: string, user: AuthUser): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/** Clear auth data from localStorage */
export function clearAuth(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/** Read stored token; returns null if missing or expired */
export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;
  if (!isTokenValid(token)) {
    clearAuth();
    return null;
  }
  return token;
}

/** Read stored user from localStorage */
export function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

/** Check if user has a required role */
export function hasRole(user: AuthUser | null, roles: AccessRole[]): boolean {
  if (!user) return false;
  return roles.includes(user.accessRole);
}

/** Check if user is ADMIN */
export function isAdmin(user: AuthUser | null): boolean {
  return user?.accessRole === 'ADMIN';
}
