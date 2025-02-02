import { API_URL } from '../apiConfig';
import axios from 'axios';

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