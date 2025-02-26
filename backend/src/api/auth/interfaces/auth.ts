import { Request } from 'express';
import { UserRole } from 'src/user/interfaces/user';
import { UserDocument } from 'src/user/schemas/user.schema';

export interface PayloadToken {
  id: string;
  email: string;
}

export interface LoginResponse {
  email: string;
  name: string;
  contactPhone?: string;
  access_token?: string;
  role: UserRole;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
  contactPhone: string;
}

export type RegisterResponse = Omit<RegisterDto, 'password' | 'contactPhone'> & { id: string };

export type ReqUser = Request & { user: UserDocument };