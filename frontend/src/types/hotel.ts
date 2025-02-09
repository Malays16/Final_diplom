export type HotelId = string;

export interface Hotel {
  id: HotelId;
  title: string;
  description: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type HotelDto = Omit<Hotel, 'id' | 'createdAt' | 'updatedAt'>;