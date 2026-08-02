import api from '@/lib/api';
import type {
  SimulationSnapshot,
  SwitchSchedulerPayload,
  IncreaseCapacityPayload,
} from '@/types/simulation';

export const simService = {
  async getState(): Promise<SimulationSnapshot> {
    const { data } = await api.get<SimulationSnapshot>('/sim/state');
    return data;
  },

  async switchScheduler(payload: SwitchSchedulerPayload): Promise<{ message: string }> {
    const { data } = await api.post('/sim/scheduler', payload);
    return data;
  },

  async increaseCapacity(payload: IncreaseCapacityPayload): Promise<{ message: string }> {
    const { data } = await api.post('/sim/resources/capacity', payload);
    return data;
  },
};
