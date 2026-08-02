import api from '@/lib/api';
import type { AuditListParams, AuditListResponse } from '@/types/audit';

export const auditService = {
  async list(params?: AuditListParams): Promise<AuditListResponse> {
    const { data } = await api.get<{ success: boolean; data: AuditListResponse }>('/audit', { params });
    return data.data;
  },
};
