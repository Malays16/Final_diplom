export type ID = string;

export interface User {
  id: ID;
  name: string;
  email: string;
  role?: 'client' | 'employee';
}

export interface Message {
  id?: ID;
  author: ID;
  authorName?: string;
  text: string;
  sentAt: Date;
  readAt?: Date;
  supportRequest: ID;
}

export interface SupportRequest {
  _id: ID;
  id?: ID;
  user: ID;
  createdAt: Date;
  isActive: boolean;
  messages: ID[];
}

export interface CreateSupportRequestDto {
  user?: ID;
  text: string;
}

export interface SendMessageDto {
  supportRequest: ID;
  text: string;
}

export enum ChatRole {
  CLIENT = 'client',
  EMPLOYEE = 'employee'
}