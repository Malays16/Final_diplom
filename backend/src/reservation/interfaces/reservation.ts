import { ReservationResponse } from 'src/api/reservation-api/interfaces/reservation-api';
import { ReservationDocument } from '../schemas/reservation.schema';

export type ID = string;

export interface ReservationDto {
  userId: ID;
  hotelId: ID;
  roomId: ID;
  dateStart: Date;
  dateEnd: Date;
}

export interface ReservationSearchOptions {
  userId: ID;
  dateStart?: Date;
  dateEnd?: Date;
}

export interface IReservation {
  addReservation(data: ReservationDto): Promise<ReservationResponse>;
  removeReservation(id: ID): Promise<void>;
  getReservations(filter: ReservationSearchOptions): Promise<ReservationResponse[]>;
  getReservationById(id: ID): Promise<ReservationDocument>;
}