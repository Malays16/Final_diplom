import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SupportRequestService } from './services/support-request.service';
import { SupportRequestClientService } from './services/support-request-client.service';
import { SupportRequestEmployeeService } from './services/support-request-employee.service';
import { SupportRequest, SupportRequestSchema } from './schemas/support-request.schema';
import { Message, MessageSchema } from './schemas/message.schema';
import { SupportChatController } from './support-chat.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SupportRequest.name, schema: SupportRequestSchema },
      { name: Message.name, schema: MessageSchema }
    ])
  ],
  controllers: [SupportChatController],
  providers: [SupportRequestService, SupportRequestClientService, SupportRequestEmployeeService],
  exports: [SupportRequestService]
})
export class SupportChatModule {}