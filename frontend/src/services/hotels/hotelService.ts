import { API_URL } from '../apiConfig';
import axios, { AxiosResponse } from 'axios';
import { Hotel, HotelDto, HotelId } from '@/types/hotel';
import { HotelRoom, HotelRoomDto } from '@/types/hotel-room';
import authHeader from '../auth/authHeader';

export const getHotels = async (
  title?: string,
  limit: number = 5,
  offset: number = 0
): Promise<Hotel[]> => {
  try {
    const response = await axios.get(`${API_URL}/admin/hotels`, {
      params: {
        limit,
        offset,
        title: title || ''
      },
      headers: authHeader()
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed fetching hotels: ${error}`);
  }
};

export const getHotel = async (id: HotelId): Promise<Hotel> => {
  try {
    const response = await axios.get(`${API_URL}/admin/hotels/${id}`, {
      headers: authHeader()
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed fetching hotel: ${error}`);
  }
};

export const getHotelRooms = async (hotelRoomDto: HotelRoomDto): Promise<HotelRoom[]> => {
  try {
    const response = await axios.get(`${API_URL}/common/hotel-rooms`, {
      params: {
        limit: hotelRoomDto.limit,
        offset: hotelRoomDto.offset,
        hotel: hotelRoomDto.hotel,
        checkIn: hotelRoomDto.checkIn,
        checkOut: hotelRoomDto.checkOut
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed fetching hotel rooms: ${error}`);
  }
};

export const addHotel = async (data: HotelDto): Promise<Hotel> => {
  try {
    const response = await axios.post(
      `${API_URL}/admin/hotels`,
      {
        title: data.title,
        description: data.description,
        images: data.images
      },
      {
        headers: authHeader()
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed adding hotel: ${error}`);
  }
};

export const updateHotel = async (id: HotelId, data: HotelDto): Promise<Hotel> => {
  try {
    const response = await axios.put(
      `${API_URL}/admin/hotels/${id}`,
      {
        title: data.title,
        description: data.description,
        images: data.images
      },
      {
        headers: authHeader()
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed updating hotel: ${error}`);
  }
};

export const uploadFile = async (file: File, dir: string): Promise<string[]> => {
  try {
    const directory = dir === 'hotels' ? 'hotels' : 'hotel-rooms';
    const formData = new FormData();
    formData.append('files', file);

    const config = {
      headers: {
        ...authHeader(),
        'Content-Type': 'multipart/form-data'
      }
    };

    const response: AxiosResponse<{ images: string[] }> = await axios.post(`${API_URL}/admin/${directory}/upload`, formData, config);
    return response.data.images;
  } catch (error) {
    throw new Error(`Failed uploading file: ${error}`);
  }
};