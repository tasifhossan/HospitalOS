import { demoSimulationSnapshot } from '@/demo/performance';
import type { SimulationSnapshot } from '@/types/simulation';

export const demoPerformanceService = {
  async getState(): Promise<SimulationSnapshot> {
    return demoSimulationSnapshot;
  },
};
export default demoPerformanceService;
