import axios from 'axios';
import { API_URL } from '../apiConfig';
import { AuthUser, LoginUserDto, RegUserDto, User } from '@/types/user';

export const login = async (user: LoginUserDto): Promise<AuthUser> => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      { email: user.email, password: user.password },
      { withCredentials: true }
    );
    if (response.data?.access_token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Login failed');
  }
};

export const register = async (user: RegUserDto): Promise<User> => {
  try {
    const response = await axios.post(
      `${API_URL}/client/register`,
      {
        email: user.email,
        password: user.password,
        name: user.name,
        contactPhone: user.contactPhone
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed registering user: ${error}`);
  }
};