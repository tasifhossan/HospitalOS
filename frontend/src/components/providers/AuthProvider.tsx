'use client';

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import type { AuthUser, AccessRole, LoginCredentials } from '@/types/auth';
import { ROLE_HOME } from '@/types/auth';
import { authService } from '@/services/authService';
import { getStoredToken, getStoredUser, clearAuth } from '@/lib/auth';
import { getApiError } from '@/lib/api';

export interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  hasRole: (roles: AccessRole[]) => boolean;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    const storedToken = getStoredToken();
    const storedUser = getStoredUser();
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const response = await authService.login(credentials);
      setToken(response.token);
      setUser(response.user);
      const dest = ROLE_HOME[response.user.accessRole] ?? '/settings';
      router.push(dest);
    },
    [router],
  );

  const logout = useCallback(() => {
    authService.logout();
    clearAuth();
    setUser(null);
    setToken(null);
    router.push('/login');
  }, [router]);

  const hasRole = useCallback(
    (roles: AccessRole[]) => {
      if (!user) return false;
      return roles.includes(user.accessRole);
    },
    [user],
  );

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!user && !!token,
      isLoading,
      login,
      logout,
      hasRole,
    }),
    [user, token, isLoading, login, logout, hasRole],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Re-export so useAuth can import from here
export { getApiError };
