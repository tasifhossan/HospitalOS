import { demoAuditLogs } from '@/demo/audit';
import type { AuditListResponse } from '@/types/audit';

export const demoAuditService = {
  async list(): Promise<AuditListResponse> {
    return {
      logs: demoAuditLogs,
      pagination: {
        total: demoAuditLogs.length,
        page: 1,
        limit: 10,
        totalPages: 1,
      },
    };
  },
};
export default demoAuditService;
