import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { SupportRequestService } from './services/support-request.service';
import { UserDocument } from 'src/user/schemas/user.schema';

@WebSocketGateway()
export class SupportChatGateway {
  constructor(private readonly supportRequestService: SupportRequestService) {}

  private clients = new Map<string, any>();

  handleConnection(client: UserDocument) {
    this.clients.set(client.id, client);
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: UserDocument) {
    this.clients.delete(client.id);
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  async handleMessage(client: UserDocument, payload: any) {
    const message = await this.supportRequestService.sendMessage(payload);
    this.broadcastMessage(message);
  }

  private broadcastMessage(message: any) {
    this.clients.forEach((client) => {
      client.emit('message', message);
    });
  }
}