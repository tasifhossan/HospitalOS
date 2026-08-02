import { demoFiles } from '@/demo/files';
import type { PatientFile } from '@/types/file';

export const demoFileService = {
  async list(): Promise<PatientFile[]> {
    return demoFiles;
  },
};
export default demoFileService;
