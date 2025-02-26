import { API_URL } from '../apiConfig';
import axios from 'axios';
import { Reservation } from '@/types/reservation';
import authHeader from '../auth/authHeader';

export const getReservations = async (userId: string): Promise<Reservation[]> => {
  try {
    const response = await axios.get(`${API_URL}/manager/reservations/${userId}`, {
      headers: authHeader()
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed fetching reservations: ${error}`);
  }
};