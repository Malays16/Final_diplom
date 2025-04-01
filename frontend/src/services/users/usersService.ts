import { User, UserFormData, UsersQueryParams } from '@/types/user';
import { API_URL } from '../apiConfig';
import axios from 'axios';
import authHeader from '../auth/authHeader';

export const getUsers = async (limit: number, offset: number, query?: string): Promise<User[]> => {
  try {
    const params: UsersQueryParams = { limit, offset };
    if (query) {
      if (/@|\./.test(query)) params.email = query;
      else if (/\d/.test(query)) params.contactPhone = query;
      else params.name = query;
    }
    const response = await axios.get(`${API_URL}/admin/users`, {
      params,
      headers: authHeader()
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed fetching users: ${error}`);
  }
};

export const getUserById = async (userId: string): Promise<User> => {
  try {
    const response = await axios.get(`${API_URL}/manager/user/${userId}`, {
      headers: authHeader()
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed fetching user: ${error}`);
  }
};

export const createUser = async (user: UserFormData): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/admin/users`, user);
    return response.data;
  } catch (error) {
    throw new Error(`Failed creating user: ${error}`);
  }
};

export const updateUser = async (userId: string, user: UserFormData): Promise<User> => {
  try {
    const response = await axios.put(`${API_URL}/admin/users/${userId}`, user, {
      headers: authHeader()
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed updating user: ${error}`);
  }
}

export const removeUser = async (userId: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/admin/users/${userId}`, {
      headers: authHeader()
    });
  } catch (error) {
    throw new Error(`Failed removing user: ${error}`);
  }
};