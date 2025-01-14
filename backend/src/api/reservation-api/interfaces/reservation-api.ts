import { ID } from 'src/user/interfaces/user';

export interface CreateReservationDto {
  hotelRoom: string;
  startDate: Date;
  endDate: Date;
}

export interface ReservationResponse {
  id?: string;
  userId?: ID;
  startDate: Date;
  endDate: Date;
  hotelRoom: {
    description: string;
    images: string[];
  };
  hotel: {
    title: string;
    description: string;
  };
}