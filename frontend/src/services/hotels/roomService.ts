import { API_URL } from '../apiConfig';
import axios from 'axios';
import { HotelRoom, HotelRoomId, RoomDto } from '@/types/hotel-room';
import authHeader from '../auth/authHeader';

export const getHotelRoom = async (roomId: HotelRoomId): Promise<HotelRoom> => {
  try {
    const response = await axios.get(`${API_URL}/common/hotel-rooms/${roomId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed fetching hotel room: ${error}`);
  }
};

export const addRoom = async (data: RoomDto): Promise<HotelRoom> => {
  try {
    const response = await axios.post(
      `${API_URL}/admin/hotel-rooms`,
      {
        hotelId: data.hotel,
        title: data.title,
        description: data.description,
        images: data.images
      },
      { headers: authHeader() }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed adding hotelroom: ${error}`);
  }
};

export const updateRoom = async (roomId: HotelRoomId, data: RoomDto): Promise<HotelRoom> => {
  try {
    const response = await axios.put(
      `${API_URL}/admin/hotel-rooms/${roomId}`,
      {
        hotelId: data.hotel,
        title: data.title,
        description: data.description,
        images: data.images
      },
      { headers: authHeader() }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed updating hotelroom: ${error}`);
  }
};