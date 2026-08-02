import api from '@/lib/api';
import type { AuthUser } from '@/types/auth';

export const adminService = {
  async listUsers(): Promise<AuthUser[]> {
    const { data } = await api.get<{ success: boolean; data: AuthUser[] }>('/admin/users');
    // Fallback if backend returns direct array in older builds
    return Array.isArray(data) ? data : (data.data || []);
  },

  async deleteUser(id: string): Promise<{ message: string }> {
    const { data } = await api.delete(`/admin/users/${id}`);
    return data;
  },

  async createUser(payload: any): Promise<AuthUser> {
    const { data } = await api.post<{ success: boolean; data: AuthUser }>('/auth/create-user', payload);
    return data.data;
  },

  async getResources(): Promise<any> {
    const { data } = await api.get<any>('/admin/resources');
    return data.data;
  }
};
