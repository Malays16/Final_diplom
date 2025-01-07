import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SupportRequestClientService } from './services/support-request-client.service';
import { CreateSupportRequestDto, GetChatListParams, MarkMessagesAsReadDto, SendMessageDto } from './interfaces/support-chat';
import { SupportRequestEmployeeService } from './services/support-request-employee.service';
import { SupportRequestService } from './services/support-request.service';
import { SupportRequest } from './schemas/support-request.schema';
import { Message } from './schemas/message.schema';

@Controller('support-chat')
export class SupportChatController {
  constructor(
    private readonly supportRequestClientService: SupportRequestClientService,
    private readonly supportRequestEmployeeService: SupportRequestEmployeeService,
    private readonly supportRequestService: SupportRequestService
  ) {}

  @Post('create')
  async createSupportRequest(@Body() data: CreateSupportRequestDto): Promise<SupportRequest> {
    return await this.supportRequestClientService.createSupportRequest(data);
  }

  @Post('mark-read')
  async markMessagesAsRead(@Body() params: MarkMessagesAsReadDto): Promise<void> {
    await this.supportRequestClientService.markMessagesAsRead(params);
  }

  @Get('unread-count/:supportRequestId')
  async getUnreadCount(@Param('supportRequestId') supportRequestId: string): Promise<number> {
    return this.supportRequestClientService.getUnreadCount(supportRequestId);
  }

  @Post('employee/mark-read')
  async employeeMarkMessagesAsRead(@Body() params: MarkMessagesAsReadDto): Promise<void> {
    await this.supportRequestEmployeeService.markMessagesAsRead(params);
  }

  @Get('employee/unread-count/:supportRequestId')
  async employeeGetUnreadCount(@Param('supportRequestId') supportRequestId: string): Promise<number> {
    return this.supportRequestEmployeeService.getUnreadCount(supportRequestId);
  }

  @Post('employee/close-request/:supportRequestId')
  async closeRequest(@Param('supportRequestId') supportRequestId: string): Promise<void> {
    await this.supportRequestEmployeeService.closeRequest(supportRequestId);
  }

  @Get('requests')
  async findSupportRequests(@Query() params: GetChatListParams): Promise<SupportRequest[]> {
    return await this.supportRequestService.findSupportRequests(params);
  }

  @Post('send-message')
  async sendMessage(@Body() data: SendMessageDto): Promise<Message> {
    return await this.supportRequestService.sendMessage(data);
  }

  @Get('messages/:supportRequestId')
  async getMessages(@Param('supportRequestId') supportRequestId: string): Promise<Message[]> {
    return await this.supportRequestService.getMessages(supportRequestId);
  }
}