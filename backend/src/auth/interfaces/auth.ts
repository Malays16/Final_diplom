export interface PayloadToken {
  id: string;
  email: string;
}

export interface LoginResponse extends PayloadToken {
  access_token: string;
}