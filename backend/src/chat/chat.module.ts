import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatService } from './chat.service';
import { SupportRequest, SupportRequestSchema } from './schemas/support-request.schema';
import { Message, MessageSchema } from './schemas/message.schema';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SupportRequest.name, schema: SupportRequestSchema },
      { name: Message.name, schema: MessageSchema }
    ])
  ],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService]
})
export class ChatModule {}