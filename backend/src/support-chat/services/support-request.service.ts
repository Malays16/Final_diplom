import { Injectable } from '@nestjs/common';
import { GetChatListParams, ID, ISupportRequestService, SendMessageDto } from '../interfaces/support-chat';
import { SupportRequest, SupportRequestDocument } from '../schemas/support-request.schema';
import { Model } from 'mongoose';
import { Message, MessageDocument } from '../schemas/message.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SupportRequestService implements ISupportRequestService {
  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>
  ) {}

  findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]> {
    const query: any = {};
    if (params.user) {
      query.user = params.user;
    }
    if (typeof params.isActive === 'boolean') {
      query.isActive = params.isActive;
    }
    return this.supportRequestModel.find(query).populate('messages').exec();
  }

  async sendMessage(data: SendMessageDto): Promise<Message> {
    const message = new this.messageModel({
      author: data.author,
      text: data.text,
      supportRequest: data.supportRequest
    });
    await message.save();
    await this.supportRequestModel.findByIdAndUpdate(data.supportRequest, {
      $push: { messages: message._id }
    });
    return message;
  }

  getMessages(supportRequest: ID): Promise<Message[]> {
    return this.messageModel.find({ supportRequest }).exec();
  }

  subscribe(handler: (supportRequest: SupportRequest, message: Message) => void): () => void {
    const changeStream = this.messageModel.watch();
    changeStream.on('change', async (change) => {
      if (change.operationType === 'insert') {
        const message = await this.messageModel
          .findById(change.documentKey._id)
          .exec();
        const supportRequest = await this.supportRequestModel
          .findById(message._id)
          .exec();
        handler(supportRequest, message);
      }
    });
    return () => changeStream.close();
  }
}