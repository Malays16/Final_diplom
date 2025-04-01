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
  deleteUser: (id: UserId) => void;
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

export type AuthUser = User & { access_token: string };

export type RegUserDto = Omit<User, 'id' | 'role'> & { password: string };

export type LoginUserDto = Omit<RegUserDto, 'name' | 'contactPhone'>;

export enum ModalType {
  LOGIN = 'login',
  REGISTER = 'register'
}

export interface UserFormData {
  email: string;
  password: string;
  name: string;
  contactPhone: string;
  role: UserRole;
}

export interface FormErrors {
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  role?: string;
}