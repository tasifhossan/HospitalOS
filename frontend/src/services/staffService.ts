import api from '@/lib/api';
import type { StaffMember, CreateStaffPayload, UpdateStaffPayload } from '@/types/staff';

export const staffService = {
  async list(): Promise<StaffMember[]> {
    const { data } = await api.get<StaffMember[]>('/staff');
    return data;
  },

  async create(payload: CreateStaffPayload): Promise<StaffMember> {
    const { data } = await api.post<StaffMember>('/staff', payload);
    return data;
  },

  async update(id: string, payload: UpdateStaffPayload): Promise<StaffMember> {
    const { data } = await api.put<StaffMember>(`/staff/${id}`, payload);
    return data;
  },

  async remove(id: string): Promise<{ message: string }> {
    const { data } = await api.delete(`/staff/${id}`);
    return data;
  },
};
