import type { AuditLog } from '@/types/audit';

export const demoAuditLogs: AuditLog[] = [
  { id: 'log-1', userId: 'u2', userEmail: 'doctor@hospital.local', action: 'FILE_DOWNLOAD', resourceType: 'PatientFile', resourceId: 'file-1', timestamp: new Date(Date.now() - 300000).toISOString(), metadata: { fileName: 'MedicalReport_u12.enc' } },
  { id: 'log-2', userId: 'u1', userEmail: 'admin@hospital.local', action: 'SCHEDULER_CHANGED', resourceType: 'Scheduler', resourceId: 'FCFS', timestamp: new Date(Date.now() - 600000).toISOString(), metadata: { from: 'FCFS', to: 'PRIORITY_AGING' } },
  { id: 'log-3', userId: 'u4', userEmail: 'receptionist@hospital.local', action: 'PATIENT_CREATED', resourceType: 'Patient', resourceId: 'patient-1', timestamp: new Date(Date.now() - 900000).toISOString(), metadata: { name: 'John Doe' } },
  { id: 'log-4', userId: 'u2', userEmail: 'doctor@hospital.local', action: 'CAPACITY_CHANGED', resourceType: 'Resource', resourceId: 'icuBed', timestamp: new Date(Date.now() - 1200000).toISOString(), metadata: { resource: 'icuBed', by: 2 } },
  { id: 'log-5', userId: 'u3', userEmail: 'nurse@hospital.local', action: 'LOGIN', resourceType: 'User', resourceId: 'u3', timestamp: new Date(Date.now() - 1500000).toISOString(), metadata: { device: 'Chrome / Linux' } },
];
export const demoStaffMembers = [
  { id: 'staff-1', name: 'Dr. Gregory House', role: 'DOCTOR', status: 'ACTIVE', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'staff-2', name: 'Dr. Stephen Strange', role: 'DOCTOR', status: 'ACTIVE', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'staff-3', name: 'Dr. Meredith Grey', role: 'DOCTOR', status: 'ACTIVE', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'staff-4', name: 'Nurse Florence', role: 'NURSE', status: 'ACTIVE', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];
