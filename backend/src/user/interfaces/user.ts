import { User } from '../schemas/user.schema';

export interface SearchUserParams {
  limit: number;
  offset: number;
  email: string;
  name: string;
  contactPhone: string;
}

export type ID = string;

export interface IUserService {
  create(data: Partial<User>): Promise<User>;
  findById(id: ID): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(params: SearchUserParams): Promise<UserResponse[]>;
}

export interface UserResponse {
  id: ID;
  email: string;
  name: string;
  contactPhone: string;
  role?: UserRole;
}

export enum UserRole {
  CLIENT = 'client',
  ADMIN = 'admin',
  MANAGER = 'manager'
}