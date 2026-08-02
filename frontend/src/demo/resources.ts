export const demoResources = {
  resources: [
    { type: 'DOCTOR', capacity: 24, available: 18, allocated: 6 },
    { type: 'NURSE', capacity: 38, available: 30, allocated: 8 },
    { type: 'ICU_BED', capacity: 20, available: 12, allocated: 8 },
    { type: 'BED', capacity: 8, available: 6, allocated: 2 },
    { type: 'CABIN', capacity: 60, available: 45, allocated: 15 },
    { type: 'MRI', capacity: 3, available: 2, allocated: 1 },
    { type: 'CT_SCAN', capacity: 2, available: 1, allocated: 1 },
    { type: 'VENTILATOR', capacity: 12, available: 8, allocated: 4 },
    { type: 'AMBULANCE', capacity: 5, available: 4, allocated: 1 },
  ],
  allocations: [
    { id: 'alloc-1', resourceName: 'ICU Bed', patientName: 'John Doe', queueLength: 3, durationMs: 15000, priority: 'HIGH' },
    { id: 'alloc-2', resourceName: 'Doctor', patientName: 'Alice Smith', queueLength: 3, durationMs: 30000, priority: 'MEDIUM' },
  ],
  blockedRequests: [
    { id: 'blocked-1', patientName: 'Bob Vance', resourceType: 'ICU_BED', requestTime: new Date(Date.now() - 60000).toISOString(), waitingTime: '1m 0s' },
  ],
};
