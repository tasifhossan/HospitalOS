import api from '@/lib/api';
import type { AuthUser } from '@/types/auth';

export const adminService = {
  async listUsers(): Promise<AuthUser[]> {
    const { data } = await api.get<AuthUser[]>('/admin/users');
    return data;
  },

  async deleteUser(id: string): Promise<{ message: string }> {
    const { data } = await api.delete(`/admin/users/${id}`);
    return data;
  },
};
