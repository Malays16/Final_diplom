export type HotelId = string;

export interface Hotel {
  id: HotelId;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}