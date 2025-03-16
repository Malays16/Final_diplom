export type ID = string;

export enum ChatRole {
  CLIENT = 'client',
  EMPLOYEE = 'employee'
}

export interface CreateSupportRequestDto {
  user: ID;
  text: string;
}

export interface SendMessageDto {
  author: string;
  supportRequest: string;
  text: string;
  sentAt: Date;
}

export type SendMessageResponse = SendMessageDto & { id: string };