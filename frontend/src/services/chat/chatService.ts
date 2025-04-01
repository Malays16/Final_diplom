import axios from 'axios';
import { HOST } from '../apiConfig';
import { CreateSupportRequestDto, ID, SupportRequest } from '@/types/chat';

const apiClient = axios.create({
  baseURL: `${HOST}/chat`,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(config => {
  const { access_token: token } = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || '')
    : {};
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const chatService = {
  getEmployeeChats: async (isActive: boolean = true): Promise<SupportRequest[]> => {
    const response = await apiClient.get('/requests', {
      params: { isActive }
    });
    return response.data;
  },

  createSupportRequest: async (data: CreateSupportRequestDto): Promise<SupportRequest> => {
    try {
      const response = await apiClient.post('/create-request', data);
      return response.data;
    } catch (error) {
      throw new Error(`Error creating request: ${error}`);
    }
  },

  getChatHistory: async (requestId: string): Promise<SupportRequest> => {
    try {
      const response = await apiClient.get(`${HOST}/chat/requests/${requestId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error getting chat history: ${error}`);
    }
  },

  closeRequest: async (requestId: ID): Promise<void> => {
    try {
      await apiClient.put(`${HOST}/chat/requests/${requestId}`);
    } catch (error) {
      throw new Error(`Error closing request: ${error}`);
    }
  }
};