import { API_URL } from '../apiConfig';
import axios from 'axios';
import { Reservation } from '@/types/reservation';
import authHeader from '../auth/authHeader';
import { CreateReservationDto } from '@/types/reservation';

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

export const createReservation = async (params: CreateReservationDto): Promise<Reservation> => {
  const { hotelRoom, startDate, endDate } = params;
  try {
    return await axios.post(
      `${API_URL}/client/reservations`,
      { hotelRoom, startDate, endDate },
      { headers: authHeader() }
    );
  } catch (error) {
    throw new Error(`Failed creating reservation: ${error}`);
  }
};