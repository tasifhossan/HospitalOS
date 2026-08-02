export type StaffRole = 'DOCTOR' | 'NURSE' | 'RECEPTIONIST' | 'ADMIN';
export type StaffStatus = 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE';

export interface StaffMember {
  id: string;
  name: string;
  role: StaffRole;
  status: StaffStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStaffPayload {
  name: string;
  role: StaffRole;
  status: StaffStatus;
}

export interface UpdateStaffPayload {
  name?: string;
  role?: StaffRole;
  status?: StaffStatus;
}
