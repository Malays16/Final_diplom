import { ObjectId } from 'mongoose';

export type ID = string | ObjectId;

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

// export interface MarkMessagesAsReadDto {
//   user: ID;
//   supportRequest: ID;
//   createdBefore: Date;
//   role?: ChatRole;
// }

// export interface GetChatListParams {
//   user: ID | null;
//   isActive: boolean;
// }

// export interface ISupportRequestService {
//   findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]>;
//   sendMessage(data: SendMessageDto): Promise<Message>;
//   getMessages(supportRequest: ID): Promise<Message[]>;
//   subscribe(handler: (supportRequest: SupportRequest, message: Message) => void): () => void;
// }

// export interface ISupportRequestClientService {
//   createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest>;
//   markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void>;
//   getUnreadCount(supportRequest: ID): Promise<number>;
// }

// export interface ISupportRequestEmployeeService {
//   markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void>;
//   getUnreadCount(supportRequest: ID): Promise<number>;
//   closeRequest(supportRequest: ID): Promise<void>;
// }