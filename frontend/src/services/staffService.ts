import api from '@/lib/api';
import type { StaffMember, CreateStaffPayload, UpdateStaffPayload } from '@/types/staff';

const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export const staffService = {
  async list(): Promise<StaffMember[]> {
    if (isDemo) {
      const { demoStaffMembers } = await import('@/demo/audit');
      return demoStaffMembers as any;
    }
    try {
      const { data } = await api.get<{ success: boolean; data: StaffMember[] }>('/staff');
      return data.data;
    } catch (err) {
      console.warn('Backend staff list failed, falling back to Demo Data:', err);
      const { demoStaffMembers } = await import('@/demo/audit');
      return demoStaffMembers as any;
    }
  },

  async create(payload: CreateStaffPayload): Promise<StaffMember> {
    if (isDemo) {
      return { id: `demo-staff-${Date.now()}`, name: payload.name, role: payload.role, status: payload.status, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    }
    const { data } = await api.post<{ success: boolean; data: StaffMember }>('/staff', payload);
    return data.data;
  },

  async update(id: string, payload: UpdateStaffPayload): Promise<StaffMember> {
    if (isDemo) {
      return { id, name: payload.name || 'Staff Member', role: payload.role || 'DOCTOR', status: payload.status || 'ACTIVE', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    }
    const { data } = await api.put<{ success: boolean; data: StaffMember }>(`/staff/${id}`, payload);
    return data.data;
  },

  async remove(id: string): Promise<{ message: string }> {
    if (isDemo) {
      return { message: 'Demo Staff member deallocated.' };
    }
    const { data } = await api.delete<{ success: boolean; message: string }>(`/staff/${id}`);
    return data;
  },
};
