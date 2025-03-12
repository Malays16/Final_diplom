import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SupportRequest, SupportRequestDocument } from './schemas/support-request.schema';
import { Message, MessageDocument } from './schemas/message.schema';
import { Model } from 'mongoose';
import { CreateSupportRequestDto, SendMessageDto, SendMessageResponse } from './interfaces/chat';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(SupportRequest.name) private supportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>
  ) {}

  async createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequestDocument> {
    try {
      const supportRequest = new this.supportRequestModel({
        user: data.user,
        createdAt: new Date(),
        messages: [],
        isActive: true
      });
      const savedRequest = await supportRequest.save();
      return savedRequest;
    } catch (error) {
      console.error('Error creating support request:', error);
      throw new Error('Error creating support request');
    }
  }

  async sendMessage(data: SendMessageDto): Promise<SendMessageResponse> {
    const supportRequest = await this.supportRequestModel.findById(data.supportRequest);
    if (!supportRequest) {
      throw new NotFoundException('Support request not found');
    }
    const message: MessageDocument = new this.messageModel({
      author: data.author,
      sentAt: new Date(),
      text: data.text,
      supportRequest: data.supportRequest
    });
    const savedMessage = await message.save();
    supportRequest.messages.push(savedMessage.id);
    await supportRequest.save();
    return {
      id: savedMessage._id.toString(),
      author: savedMessage.author,
      text: savedMessage.text,
      sentAt: savedMessage.sentAt,
      supportRequest: savedMessage.supportRequest.toString()
    };
  }

  async getSupportRequests(params: any): Promise<SupportRequest[]> {
    return await this.supportRequestModel.find(params).populate('messages').exec();
  }

  async getSupportRequest(requestId: string): Promise<SupportRequest> {
    try {
      const request = await this.supportRequestModel
        .findById(requestId)
        .populate({
          path: 'messages',
          options: { sort: { sentAt: 1 } }
        })
        .populate({
          path: 'user',
          select: 'name email'
        })
        .exec();
      if (!request) {
        throw new NotFoundException('Support request not found');
      }
      return request;
    } catch (error) {
      console.error('Error fetching support request:', error);
      throw new BadRequestException('Error fetching support request');
    }
  }
}