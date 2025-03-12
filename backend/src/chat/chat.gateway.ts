import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { CreateSupportRequestDto } from './interfaces/chat';
import { Message } from './schemas/message.schema';
import { UserRole } from 'src/user/interfaces/user';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private clients = new Map<string, { socket: Socket; role: string; name: string }>();

  constructor(private readonly chatService: ChatService) {}

  afterInit(server: Server) {
    console.log('Websocket server initialized', server);
  }

  async handleConnection(client: Socket) {
    const { role, name } = client.handshake.query;
    console.log('Client connected: ', { clientId: client.id, role, name });
    this.clients.set(client.id, {
      socket: client,
      role: role as string,
      name: name as string
    });
    this.server.emit('clientConnected', client.id);
  }

  async handleDisconnect(client: Socket) {
    console.log('Client disconnected: ', client.id);
    this.clients.delete(client.id);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: Socket, room: string) {
    try {
      const clientInfo = this.clients.get(client.id);

      const eventData = {
        message: `${clientInfo.role === UserRole.MANAGER ? 'Менеджер' : 'Клиент'} присоединился к чату ${room}`,
        name: clientInfo.name
      };

      this.server.to(room).emit(`${clientInfo.role}Joined`, eventData);

      await client.join(room);
      const request = await this.chatService.getSupportRequest(room);
      client.emit('clientInfo', request.user);
    } catch (error) {
      console.error('Ошибка при подключении к комнате:', error);
      client.emit('error', { message: 'Ошибка при присоединении к чату' });
    }
  }

  @SubscribeMessage('createRequest')
  async handleCreateSupportRequest(client: Socket, data: CreateSupportRequestDto) {
    try {
      const request = await this.chatService.createSupportRequest(data);
      const requestId = request.id.toString();
      client.join(requestId);

      client.emit('requestCreated', {
        id: requestId,
        user: request.user,
        createdAt: request.createdAt
      });
    } catch (error) {
      console.error('Ошибка при создании support request:', error);
      client.emit('error', { message: 'Ошибка при создании запроса поддержки' });
    }
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: Message): Promise<void> {
    try {
      const supportRequestId = payload.supportRequest.toString();
      const message = await this.chatService.sendMessage({
        author: payload.author,
        text: payload.text,
        supportRequest: supportRequestId,
        sentAt: payload.sentAt
      });
      this.server.to(supportRequestId).emit('messageSent', message);
    } catch (error) {
      console.error('Ошибка при обработке сообщения:', error);
      client.emit('error', { message: 'Ошибка при обработке сообщения' });
    }
  }
}