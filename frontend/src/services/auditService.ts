import api from '@/lib/api';
import type { AuditListParams, AuditListResponse } from '@/types/audit';

const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export const auditService = {
  async list(params?: AuditListParams): Promise<AuditListResponse> {
    if (isDemo) {
      const { demoAuditLogs } = await import('@/demo/audit');
      return {
        logs: demoAuditLogs,
        pagination: {
          total: demoAuditLogs.length,
          page: params?.page || 1,
          limit: params?.limit || 15,
          totalPages: 1,
        },
      };
    }
    try {
      const { data } = await api.get<{ success: boolean; data: AuditListResponse }>('/audit', { params });
      return data.data;
    } catch (err) {
      console.warn('Backend audit list failed, falling back to Demo Data:', err);
      const { demoAuditLogs } = await import('@/demo/audit');
      return {
        logs: demoAuditLogs,
        pagination: {
          total: demoAuditLogs.length,
          page: params?.page || 1,
          limit: params?.limit || 15,
          totalPages: 1,
        },
      };
    }
  },
};
