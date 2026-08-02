import type { AuthUser } from '@/types/auth';

export const demoUsers: AuthUser[] = [
  { id: 'u1', email: 'admin@hospital.local', accessRole: 'ADMIN' },
  { id: 'u2', email: 'doctor@hospital.local', accessRole: 'DOCTOR' },
  { id: 'u3', email: 'nurse@hospital.local', accessRole: 'NURSE' },
  { id: 'u4', email: 'receptionist@hospital.local', accessRole: 'RECEPTIONIST' },
  { id: 'u5', email: 'patient@hospital.local', accessRole: 'PATIENT' },
];
export const demoActiveSessions = [
  { email: 'admin@hospital.local', role: 'ADMIN', sessionStart: '08:00 AM', lastActivity: 'Just now', device: 'Chrome / Windows 11', status: 'ACTIVE' },
  { email: 'doctor@hospital.local', role: 'DOCTOR', sessionStart: '08:15 AM', lastActivity: '2m ago', device: 'Firefox / macOS', status: 'ACTIVE' },
  { email: 'nurse@hospital.local', role: 'NURSE', sessionStart: '08:30 AM', lastActivity: '5m ago', device: 'Safari / iPadOS', status: 'ACTIVE' },
];
