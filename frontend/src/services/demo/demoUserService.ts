import { demoUsers } from '@/demo/users';
import type { AuthUser } from '@/types/auth';

export const demoUserService = {
  async list(): Promise<AuthUser[]> {
    return demoUsers;
  },
};
export default demoUserService;
