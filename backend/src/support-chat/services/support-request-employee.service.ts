import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventEmitter } from 'events';
import { Message, MessageDocument } from '../schemas/message.schema';
import { SupportRequest, SupportRequestDocument } from '../schemas/support-request.schema';
import { ISupportRequestEmployeeService, MarkMessagesAsReadDto } from '../interfaces/support-chat';

@Injectable()
export class SupportRequestEmployeeService implements ISupportRequestEmployeeService {
  private eventEmitter = new EventEmitter();

  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>
  ) {}

  async getUnreadCount(supportRequest: string): Promise<number> {
    return this.messageModel.countDocuments({
      supportRequest,
      readAt: null,
      author: 'user'
    });
  }

  async markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void> {
    await this.messageModel.updateMany(
      {
        supportRequest: params.supportRequest,
        readAt: null,
        author: 'user'
      },
      { readAt: new Date() }
    );
    this.eventEmitter.emit('messagesRead', params.supportRequest);
  }

  async closeRequest(supportRequest: string): Promise<void> {
    await this.supportRequestModel.findByIdAndUpdate(supportRequest, {
      isActive: false
    });
    this.eventEmitter.emit('requestClosed', supportRequest);
  }
}