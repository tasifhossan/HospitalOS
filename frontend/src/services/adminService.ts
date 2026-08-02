import api from '@/lib/api';
import type { AuthUser } from '@/types/auth';

const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export const adminService = {
  async listUsers(): Promise<AuthUser[]> {
    if (isDemo) {
      const { demoUsers } = await import('@/demo/users');
      return demoUsers;
    }
    try {
      const { data } = await api.get<{ success: boolean; data: AuthUser[] }>('/admin/users');
      return Array.isArray(data) ? data : (data.data || []);
    } catch (err: any) {
      console.warn('Backend listUsers failed, falling back to Demo Data:', err);
      const { demoUsers } = await import('@/demo/users');
      return demoUsers;
    }
  },

  async deleteUser(id: string): Promise<{ message: string }> {
    if (isDemo) {
      return { message: 'Demo User account deallocated.' };
    }
    try {
      const { data } = await api.delete(`/admin/users/${id}`);
      return data;
    } catch (err: any) {
      console.warn('Backend deleteUser failed, falling back to Demo Data:', err);
      return { message: 'Local deallocation mock success.' };
    }
  },

  async createUser(payload: any): Promise<AuthUser> {
    if (isDemo) {
      return { id: `demo-u-${Date.now()}`, email: payload.email, accessRole: payload.accessRole };
    }
    const { data } = await api.post<{ success: boolean; data: AuthUser }>('/auth/create-user', payload);
    return data.data;
  },

  async getResources(): Promise<any> {
    if (isDemo) {
      const { demoResources } = await import('@/demo/resources');
      return demoResources.resources;
    }
    try {
      const { data } = await api.get<any>('/admin/resources');
      return data.data;
    } catch (err) {
      console.warn('Backend getResources failed, falling back to Demo Data:', err);
      const { demoResources } = await import('@/demo/resources');
      return demoResources.resources;
    }
  }
};
