import { User, UsersQueryParams } from '@/types/user';
import { API_URL } from '../apiConfig';
import axios from 'axios';

export const getUsers = async (limit: number, offset: number, query?: string): Promise<User[]> => {
  try {
    const params: UsersQueryParams = { limit, offset };
    if (query) {
      if (/@|\./.test(query)) params.email = query;
      else if (/\d/.test(query)) params.contactPhone = query;
      else params.name = query;
    }
    const response = await axios.get(`${API_URL}/admin/users`, { params });
    return response.data;
  } catch (error) {
    throw new Error(`Failed fetching users: ${error}`);
  }
};

export const getUserById = async (userId: string): Promise<User> => {
  try {
    const response = await axios.get(`${API_URL}/manager/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed fetching user: ${error}`);
  }
};