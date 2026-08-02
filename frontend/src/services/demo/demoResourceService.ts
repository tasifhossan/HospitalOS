import { demoResources } from '@/demo/resources';

export const demoResourceService = {
  async getResources(): Promise<any> {
    return demoResources.resources;
  },
};
export default demoResourceService;
