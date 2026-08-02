import api from '@/lib/api';
import type { ComparisonRun, RunComparisonPayload } from '@/types/comparison';

export const comparisonService = {
  async run(payload: RunComparisonPayload): Promise<ComparisonRun> {
    const { data } = await api.post<ComparisonRun>('/comparison/run', payload);
    return data;
  },

  async listRuns(): Promise<ComparisonRun[]> {
    const { data } = await api.get<ComparisonRun[]>('/comparison/runs');
    return data;
  },

  async getRun(id: string): Promise<ComparisonRun> {
    const { data } = await api.get<ComparisonRun>(`/comparison/runs/${id}`);
    return data;
  },
};
