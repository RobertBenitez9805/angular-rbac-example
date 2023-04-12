import { Role } from './roles.type';

export interface User {
  id: number;
  email: string;
  username: string;
  roles: Role[];
  accessToken: string;
  tokenType: string;
}
