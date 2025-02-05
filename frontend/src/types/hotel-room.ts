import { HotelId } from './hotel';

export type HotelRoomId = string;

export interface HotelRoom {
  id: HotelRoomId;
  hotel: HotelId;
  title: string;
  description: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}