import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { HOST } from '@/services/apiConfig';
import { Message, SupportRequest } from '@/types/chat';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthUser, UserRole } from '@/types/user';
import axios from 'axios';
import { formatDateTime } from '@/utils/dateUtils';

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
  const socketRef = useRef<Socket | null>(null);
  const isInitMount = useRef<boolean>(true);
  const messagesRef = useRef<HTMLDivElement>(null);

  const { requestId } = useParams<{ requestId: string }>();
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (!socket || !requestId || !message.trim()) return;
    const data: Message = {
      text: message,
      author: user.id,
      sentAt: new Date(),
      supportRequest: requestId
    };

    socket.emit('sendMessage', data);
    setMessage('');
  };

  const scrollToLastMessage = () => {
    setTimeout(() => {
      if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, 5);
  };

  useEffect(() => {
    if (!isInitMount.current) return;
    isInitMount.current = false;

    const newSocket = io(HOST, {
      transports: ['websocket'],
      reconnection: true,
      query: {
        role: UserRole.MANAGER,
        id: user.id,
        name: user.name
      }
    });

    newSocket.removeAllListeners();

    newSocket.on('connect', () => {
      newSocket.emit('joinRoom', requestId);
      console.log(`${user.id} joined room ${requestId}`);
    });

    newSocket.on('disconnect', () => {
      console.log(`${user.id} disconnected from room ${requestId}`);
    });

    newSocket.on('error', (error: { message: string }) => {
      console.error('Socket error:', error);
    });

    newSocket.on('clientInfo', (data: ClientInfo) => {
      setClientInfo(data);
    });

    newSocket.on('chatHistory', (messages: Message[]) => {
      setMessages(messages);
      scrollToLastMessage();
    });

    newSocket.on('messageSent', async (data: Message) => {
      setMessages(prevMessages => [...prevMessages, data]);
      scrollToLastMessage();
    });

    setSocket(newSocket);

    return () => {
      if (socketRef.current) {
        newSocket.emit('leaveRoom', requestId);
        newSocket.disconnect();
        setSocket(null);
      }
    };
  }, [requestId, user]);

  useEffect(() => {
    const loadChatHistory = async () => {
      if (!requestId) return;
      try {
        const response = await axios.get(`${HOST}/chat/requests/${requestId}`);
        const supportRequest = response.data;
        setMessages(supportRequest.messages || []);
        setClientInfo(supportRequest.user);
        scrollToLastMessage();
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    };

    loadChatHistory();
  }, [requestId]);

  if (!requestId || !user) {
    console.error('requestId или user отсутствует');
    navigate('/');
    return;
  }

  const closeRequest = async () => {
    if (!requestId) return;
    try {
      await axios.put<SupportRequest>(`${HOST}/chat/requests/${requestId}`);
      navigate('/support-requests');
    } catch (error) {
      console.error('Error closing support request:', error);
    }
  };

  return (
    <div className="page">
      <div className="support-chat-page">
        <div className="support-chat-header">
          <h2 className="support-chat-title">Запрос #{requestId}</h2>
          <button type="button" className="btn btn-cancel" onClick={closeRequest}>
            Закрыть запрос
          </button>
        </div>
        <div className="support-chat-container">
          <div className="support-chat-messages" ref={messagesRef}>
            {messages.map((msg, index) => (
              <div
                key={`${msg._id}-${index}`}
                className={`message ${msg.author === user.id ? 'message-manager' : 'message-client'}`}>
                <div className="user-name">
                  {msg.author === user.id ? user.name : clientInfo?.name}
                </div>
                <div className="message-text">{msg.text}</div>
                <div className="message-date">{formatDateTime(msg.sentAt)}</div>
              </div >
            ))}
          </div>
        </div >
        <div className="support-chat-input">
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
            placeholder="Введите сообщение..."
          />
          <button className="btn btn-success" onClick={handleSendMessage}>Отправить</button>
        </div>
      </div>
    </div>
  );
};

export default SupportChatPage;