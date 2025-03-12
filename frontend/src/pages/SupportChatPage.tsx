import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { HOST } from '@/services/apiConfig';
import { Message } from '@/types/chat';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthUser, UserRole } from '@/types/user';

interface SupportChatProps {
  user: AuthUser;
}

interface ClientInfo {
  id: string;
  name: string;
  email: string;
}

const SupportChatPage: React.FC<SupportChatProps> = ({ user }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>(null);

  const { requestId } = useParams<{ requestId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const newSocket = io(HOST, {
      transports: ['websocket'],
      reconnection: true,
      query: {
        role: UserRole.MANAGER,
        id: user.id,
        name: user.name
      }
    });

    let isConnected = false;

    newSocket.on('connect', () => {
      isConnected = true;
      newSocket.emit('joinRoom', requestId);
      console.log(`${user.id} joined room ${requestId}`);
    });

    newSocket.on('clientInfo', (data: ClientInfo) => {
      setClientInfo(data);
    });

    newSocket.on('messageSent', (data: Message) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    setSocket(newSocket);

    return () => {
      if (isConnected) {
        newSocket.emit('leaveRoom', requestId);
        newSocket.disconnect();
      }
    };
  }, [requestId, user]);

  if (!requestId || !user) {
    console.error('requestId или user отсутствует');
    navigate('/');
    return;
  }

  const handleSendMessage = () => {
    if (socket && message.trim()) {
      const data: Message = {
        text: message,
        author: user.id,
        sentAt: new Date(),
        supportRequest: requestId
      };

      socket.emit('sendMessage', data);
      setMessage('');
    }
  };

  return (
    <div className="support-chat">
      <div className="chat-header">
        <h2>Запрос #{requestId}</h2>
      </div>
      <div className="chat-messages">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`message ${msg.author === user.id ? 'message-manager' : 'message-client'}`}>
            <span className="user-name">
              {msg.author === user.id ? user.name : clientInfo?.name}:
            </span>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Введите сообщение..."
        />
        <button onClick={handleSendMessage}>Отправить</button>
      </div>
    </div>
  );
};

export default SupportChatPage;