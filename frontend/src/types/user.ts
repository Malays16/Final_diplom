export type UserId = string;

export interface User {
  id: UserId;
  email: string;
  name: string;
  contactPhone: string;
  role: string;
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