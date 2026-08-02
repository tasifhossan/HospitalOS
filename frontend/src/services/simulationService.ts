import api from '@/lib/api';
import type { SimulationSnapshot, SchedulerType } from '@/types/simulation';

const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export const simulationService = {
  async getState(): Promise<SimulationSnapshot> {
    if (isDemo) {
      const { demoSimulationSnapshot } = await import('@/demo/performance');
      return demoSimulationSnapshot;
    }
    try {
      const { data } = await api.get<{ success: boolean; data: SimulationSnapshot }>('/simulation/state');
      return data.data;
    } catch (err) {
      console.warn('Backend simulation state failed, falling back to Demo Data:', err);
      const { demoSimulationSnapshot } = await import('@/demo/performance');
      return demoSimulationSnapshot;
    }
  },

  async start(): Promise<{ success: boolean; message: string }> {
    if (isDemo) {
      return { success: true, message: 'Demo simulation started.' };
    }
    const { data } = await api.post<{ success: boolean; message: string }>('/simulation/start');
    return data;
  },

  async stop(): Promise<{ success: boolean; message: string }> {
    if (isDemo) {
      return { success: true, message: 'Demo simulation stopped.' };
    }
    const { data } = await api.post<{ success: boolean; message: string }>('/simulation/stop');
    return data;
  },

  async reset(): Promise<{ success: boolean; message: string }> {
    if (isDemo) {
      return { success: true, message: 'Demo simulation reset.' };
    }
    const { data } = await api.post<{ success: boolean; message: string }>('/simulation/reset');
    return data;
  },

  async switchAlgorithm(algorithm: SchedulerType): Promise<{ success: boolean; message: string }> {
    if (isDemo) {
      return { success: true, message: `Demo scheduler policy switched to ${algorithm}.` };
    }
    const { data } = await api.post<{ success: boolean; message: string }>('/simulation/algorithm', { algorithm });
    return data;
  },
};
