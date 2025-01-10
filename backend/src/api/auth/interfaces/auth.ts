export interface PayloadToken {
  id: string;
  email: string;
}

export interface LoginResponse {
  email: string;
  name: string;
  contactPhone?: string;
  access_token?: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
  contactPhone: string;
}

export type RegisterResponse = Omit<RegisterDto, 'password' | 'contactPhone'> & { id: string };