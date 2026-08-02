export interface DemoNotification {
  id: string;
  title: string;
  message: string;
  category: string;
  timestamp: string;
}

export const demoNotifications: DemoNotification[] = [
  { id: 'notif-1', title: 'Emergency Patient Arrived', message: 'Critical patient John Doe registered at emergency desk', category: 'EMERGENCY', timestamp: new Date(Date.now() - 60000).toISOString() },
  { id: 'notif-2', title: 'MRI Completed', message: 'MRI scan completed for patient Jane Smith', category: 'DIAGNOSTICS', timestamp: new Date(Date.now() - 300000).toISOString() },
  { id: 'notif-3', title: 'Report Uploaded', message: 'Medical report u12.enc uploaded to secure vault', category: 'SECURITY', timestamp: new Date(Date.now() - 600000).toISOString() },
  { id: 'notif-4', title: 'Scheduler Updated', message: 'Adaptive scheduler swapped algorithm to PRIORITY_AGING', category: 'SYSTEM', timestamp: new Date(Date.now() - 1200000).toISOString() },
  { id: 'notif-5', title: 'Resource Available', message: 'ICU Bed #4 released and returned to available pool', category: 'RESOURCE', timestamp: new Date(Date.now() - 1800000).toISOString() },
];
