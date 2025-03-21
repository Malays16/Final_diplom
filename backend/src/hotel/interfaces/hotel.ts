import { Hotel } from '../schemas/hotel.schema';

export type ID = string;

export interface SearchHotelParams {
  limit: number;
  offset: number;
  title?: string;
}

export interface UpdateHotelParams {
  title: string;
  description: string;
  images?: string[];
  updatedAt?: Date;
}

export interface IHotelService {
  create(data: Partial<Hotel>): Promise<Hotel>;
  findById(id: ID): Promise<Hotel>;
  search(params: SearchHotelParams): Promise<Hotel[]>;
  update(id: ID, params: UpdateHotelParams): Promise<Hotel>;
}