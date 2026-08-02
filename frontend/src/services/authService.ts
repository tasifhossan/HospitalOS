import api from '@/lib/api';
import { persistAuth } from '@/lib/auth';
import type { LoginCredentials, LoginResponse, RegisterPayload, RegisterResponse } from '@/types/auth';

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const { data } = await api.post<{ success: boolean; data: LoginResponse }>('/auth/login', credentials);
    persistAuth(data.data.token, data.data.user);
    return data.data;
  },

  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    const { data } = await api.post<RegisterResponse>('/auth/register', payload);
    return data;
  },

  logout(): void {
    import('@/lib/auth').then(({ clearAuth }) => clearAuth());
    import('@/lib/socket').then(({ disconnectSocket }) => disconnectSocket());
  },
};
