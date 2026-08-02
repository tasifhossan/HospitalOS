import api from '@/lib/api';
import type { SimulationSnapshot, SchedulerType } from '@/types/simulation';

export const simulationService = {
  async getState(): Promise<SimulationSnapshot> {
    const { data } = await api.get<{ success: boolean; data: SimulationSnapshot }>('/simulation/state');
    return data.data;
  },

  async start(): Promise<{ success: boolean; message: string }> {
    const { data } = await api.post<{ success: boolean; message: string }>('/simulation/start');
    return data;
  },

  async stop(): Promise<{ success: boolean; message: string }> {
    const { data } = await api.post<{ success: boolean; message: string }>('/simulation/stop');
    return data;
  },

  async reset(): Promise<{ success: boolean; message: string }> {
    const { data } = await api.post<{ success: boolean; message: string }>('/simulation/reset');
    return data;
  },

  async switchAlgorithm(algorithm: SchedulerType): Promise<{ success: boolean; message: string }> {
    const { data } = await api.post<{ success: boolean; message: string }>('/simulation/algorithm', { algorithm });
    return data;
  },
};
