export interface SystemHealthInfo {
  cpuUsage: number;
  memoryUsage: {
    total: number;
    used: number;
    percent: number;
  };
  socketStatus: 'CONNECTED' | 'DISCONNECTED';
  databaseStatus: 'CONNECTED' | 'DISCONNECTED';
  activeSessions: number;
}

export interface InfrastructureService {
  name: string;
  status: 'ONLINE' | 'OFFLINE' | 'DEGRADED';
  latency?: string;
}
