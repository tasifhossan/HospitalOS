import api from '@/lib/api';
import type { StaffMember, CreateStaffPayload, UpdateStaffPayload } from '@/types/staff';

export const staffService = {
  async list(): Promise<StaffMember[]> {
    const { data } = await api.get<{ success: boolean; data: StaffMember[] }>('/staff');
    return data.data;
  },

  async create(payload: CreateStaffPayload): Promise<StaffMember> {
    const { data } = await api.post<{ success: boolean; data: StaffMember }>('/staff', payload);
    return data.data;
  },

  async update(id: string, payload: UpdateStaffPayload): Promise<StaffMember> {
    const { data } = await api.put<{ success: boolean; data: StaffMember }>(`/staff/${id}`, payload);
    return data.data;
  },

  async remove(id: string): Promise<{ message: string }> {
    const { data } = await api.delete<{ success: boolean; message: string }>(`/staff/${id}`);
    return data;
  },
};
