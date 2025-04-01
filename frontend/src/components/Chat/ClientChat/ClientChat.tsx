import React, { useCallback, useEffect, useState } from 'react';
import './ClientChat.scss';
import { HOST } from '@/services/apiConfig';
import { io, Socket } from 'socket.io-client';
import { Message } from '@/types/chat';
import { UserRole } from '@/types/user';
import { formatDateTime } from '@/utils/dateUtils';
import SupportLogo from '@/assets/images/support-logo.svg';

interface ClientChatProps {
  userId: string;
}

interface ManagerInfo {
  message: string;
  name: string;
}

const ClientChat: React.FC<ClientChatProps> = ({ userId }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [supportRequestId, setSupportRequestId] = useState<string>('');
  const [managerInfo, setManagerInfo] = useState<ManagerInfo | null>(null);

  const handleCreateRequest = useCallback(() => {
    if (socket && userId) {
      socket.emit('createRequest', { user: userId, text: 'Здравствуйте, мне нужна помощь' });
    }
  }, [socket, userId]);

  const handleSendMessage = () => {
    if (!supportRequestId) {
      console.error('Ошибка: supportRequestId отсутствует');
      return;
    }

    if (socket && message && supportRequestId) {
      const data: Message = {
        text: message,
        author: userId,
        sentAt: new Date(),
        readAt: new Date(),
        supportRequest: supportRequestId
      };
      socket.emit('sendMessage', data);
      setMessage('');
    } else {
      console.log('Не удалось отправить сообщение');
    }
  };

  useEffect(() => {
    const newSocket = io(HOST, {
      transports: ['websocket'],
      reconnection: true,
      query: {
        role: UserRole.CLIENT,
        id: userId
      }
    });

    let isConnected = false;

    newSocket.on('connect', () => {
      isConnected = true;
      console.log('Connected to socket');
      setSocket(newSocket);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from socket');
    });

    newSocket.on('error', error => {
      console.log('Socket error:', error);
    });

    newSocket.on('requestCreated', data => {
      if (data) {
        setSupportRequestId(data.id);
        console.log(`Клиент ${userId} подключился к комнате ${data.id}`);
        newSocket.emit('joinRoom', data.id);
      } else {
        console.error('Invalid requestCreated data:', data);
      }
    });

    newSocket.on('managerJoined', (data: ManagerInfo) => {
      setManagerInfo(data);
    });

    newSocket.on('messageSent', (data: Message) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    return () => {
      if (isConnected) {
        newSocket.disconnect();
        setSocket(null);
      }
    };
  }, [userId]);

  const toggleChat = () => {
    setIsOpen(prevState => !prevState);
    if (!isOpen && !supportRequestId) {
      handleCreateRequest();
    }
  };

  return (
    <div className="chat">
      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-header-logo">
              <img src={SupportLogo} alt="Support Chat" />
            </div>
            <div className="chat-header-title">Техподдержка</div>
            <div className="chat-header-options">...</div>
          </div>
          <div className="chat-content">
            <div className="chat-message-list">
              {messages.map(msg => (
                <div
                  className={`chat-message ${msg.author === userId ? 'chat-message-client' : 'chat-message-manager'}`}
                  key={msg.id}>
                  {msg.author !== userId &&
                    <div className="user-name">
                      {managerInfo?.name}
                    </div>
                  }
                  <div className="chat-text">{msg.text}</div>
                  <div className="chat-date">{formatDateTime(msg.sentAt)}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Начните печатать"
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_3487_284)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.5918 2.71245L2.38095 7.25004H7.25013C7.66434 7.25004 8.00013 7.58582 8.00013 8.00004C8.00013 8.41425 7.66434 8.75004 7.25013 8.75004H2.38095L1.5918 13.2876L13.9295 8.00004L1.5918 2.71245ZM0.988869 8.00004L0.0637969 2.68087C-0.0109877 2.25086 0.128154 1.81135 0.436783 1.50272C0.824568 1.11494 1.40938 1.00231 1.91345 1.21834L15.3158 6.9622C15.7309 7.14013 16.0001 7.54835 16.0001 8.00004C16.0001 8.45172 15.7309 8.85995 15.3158 9.03788L1.91345 14.7817C1.40938 14.9978 0.824568 14.8851 0.436783 14.4974C0.128154 14.1887 -0.0109879 13.7492 0.0637969 13.3192L0.988869 8.00004Z"
                    fill="#2C2C2E"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3487_284">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>
      )}
      <button
        className="toggle-button"
        onClick={toggleChat}
        aria-label="Открыть чат с технической поддержкой">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="white">
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
        </svg>
      </button>
    </div>
  );
};

export default ClientChat;