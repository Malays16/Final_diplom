export type UserId = string;

export interface User {
  id: UserId;
  email: string;
  name: string;
  contactPhone: string;
  role: UserRole;
}

export interface UsersListProps {
  users: User[];
}

export interface UsersQueryParams {
  limit: number;
  offset: number;
  email?: string;
  name?: string;
  contactPhone?: string;
}

export enum UserRole {
  CLIENT = 'client',
  ADMIN = 'admin',
  MANAGER = 'manager'
}

export type AuthUser = Omit<User, 'id'> & { access_token: string };

export type RegUserDto = Omit<User, 'id' | 'role'> & { password: string };

export type LoginUserDto = Omit<RegUserDto, 'name' | 'contactPhone'>;

export enum ModalType {
  LOGIN = 'login',
  REGISTER = 'register'
}