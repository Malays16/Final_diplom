import { API_URL } from '../apiConfig';
import axios from 'axios';
import { HotelId } from '@/types/hotel';

export const getHotels = async (title?: string, limit: number = 5, offset: number = 0) => {
  try {
    const response = await axios.get(`${API_URL}/admin/hotels`, {
      params: {
        limit,
        offset,
        title: title || ''
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed fetching hotels: ${error}`);
  }
};

export const getHotel = async (id: HotelId) => {
  try {
    const response = await axios.get(`${API_URL}/admin/hotels/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed fetching hotel: ${error}`);
  }
};

export const getHotelRooms = async (
  limit?: number,
  offset?: number,
  hotel?: string,
  checkIn?: string,
  checkOut?: string
) => {
  try {
    const response = await axios.get(`${API_URL}/common/hotel-rooms`, {
      params: { limit, offset, hotel, checkIn, checkOut }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed fetching hotel rooms: ${error}`);
  }
};