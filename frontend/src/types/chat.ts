export type ID = string;

export interface User {
  id: ID;
  name: string;
  email: string;
  role?: ChatRole;
}

export interface Message {
  id?: ID;
  author: ID;
  text: string;
  sentAt: Date;
  readAt?: Date;
  supportRequest: ID;
}

export interface SupportRequest {
  id: ID;
  user: User;
  createdAt: Date;
  isActive: boolean;
  messages: Message[];
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

export interface MarkMessagesAsReadDto {
  supportRequest: ID;
  createdBefore: Date;
  role: ChatRole;
}