import { Role } from '../const/roles';

export interface IUser {
  name: string;
  email: string;
  role: Role;
}
