import { Controller, Get, HttpCode, HttpStatus, Param, Put, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ID } from './interfaces/chat';
import { SupportRequest, SupportRequestDocument } from './schemas/support-request.schema';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @HttpCode(HttpStatus.OK)
  @Get('requests')
  async getSupportRequests(@Query() params): Promise<SupportRequest[]> {
    const requests = await this.chatService.getSupportRequests(params);
    return requests;
  }

  @HttpCode(HttpStatus.OK)
  @Get('requests/:id')
  async getSupportRequest(@Param('id') id: ID): Promise<SupportRequestDocument> {
    return await this.chatService.getSupportRequest(id);
  }

  @HttpCode(HttpStatus.OK)
  @Put('requests/:id')
  async closeRequest(@Param('id') id: ID): Promise<SupportRequest> {
    const updatedRequest = await this.chatService.closeSupportRequest(id);
    return updatedRequest;
  }
}