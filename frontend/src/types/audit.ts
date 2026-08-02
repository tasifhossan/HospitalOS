export type AuditAction =
  | 'LOGIN'
  | 'LOGOUT'
  | 'REGISTER'
  | 'FILE_UPLOAD'
  | 'FILE_DOWNLOAD'
  | 'PATIENT_CREATED'
  | 'PATIENT_UPDATED'
  | 'PATIENT_DELETED'
  | 'STAFF_CREATED'
  | 'STAFF_UPDATED'
  | 'STAFF_DELETED'
  | 'APPOINTMENT_CREATED'
  | 'APPOINTMENT_UPDATED'
  | 'APPOINTMENT_DELETED'
  | 'SCHEDULER_CHANGED'
  | 'CAPACITY_CHANGED'
  | 'USER_DELETED'
  | 'COMPARISON_RUN';

export interface AuditLog {
  id: string;
  userId: string;
  userEmail: string;
  action: AuditAction;
  resourceType?: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
}

export interface AuditListParams {
  action?: string;
  userEmail?: string;
  page?: number;
  limit?: number;
}

export interface AuditListResponse {
  logs: AuditLog[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
