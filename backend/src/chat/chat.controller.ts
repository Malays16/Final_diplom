import { Controller, Get, HttpCode, HttpStatus, Param, Put, Query, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ID } from './interfaces/chat';
import { SupportRequest, SupportRequestDocument } from './schemas/support-request.schema';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/api/auth/guards/roles.guard';
import { Roles } from 'src/api/auth/decorators/roles.decorator';
import { UserRole } from 'src/user/interfaces/user';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MANAGER)
  @HttpCode(HttpStatus.OK)
  @Get('requests')
  async getSupportRequests(@Query() params): Promise<SupportRequest[]> {
    const requests = await this.chatService.getSupportRequests(params);
    return requests;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MANAGER)
  @HttpCode(HttpStatus.OK)
  @Get('requests/:id')
  async getSupportRequest(@Param('id') id: ID): Promise<SupportRequestDocument> {
    return await this.chatService.getSupportRequest(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MANAGER)
  @HttpCode(HttpStatus.OK)
  @Put('requests/:id')
  async closeRequest(@Param('id') id: ID): Promise<SupportRequest> {
    console.log('id', id);
    const updatedRequest = await this.chatService.closeSupportRequest(id);
    return updatedRequest;
  }
}