import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventEmitter } from 'events';
import { Message, MessageDocument } from '../schemas/message.schema';
import { SupportRequest, SupportRequestDocument } from '../schemas/support-request.schema';
import { CreateSupportRequestDto, ISupportRequestClientService, MarkMessagesAsReadDto } from '../interfaces/support-chat';

@Injectable()
export class SupportRequestClientService implements ISupportRequestClientService {
  private eventEmitter = new EventEmitter();

  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>
  ) {}

  async createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest> {
    const supportRequest = new this.supportRequestModel({
      user: data.user,
      createdAt: new Date(),
      messages: [],
      isActive: true
    });
    return await supportRequest.save();
  }

  async markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void> {
    await this.messageModel.updateMany(
      {
        supportRequest: params.supportRequest,
        readAt: null,
        author: { $ne: 'user' }
      },
      { readAt: new Date() }
    );
    this.eventEmitter.emit('messagesRead', params.supportRequest);
  }

  async getUnreadCount(supportRequest: string): Promise<number> {
    return this.messageModel.countDocuments({
      supportRequest,
      readAt: null,
      author: { $ne: 'user' }
    });
  }
}