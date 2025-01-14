import { BadRequestException, Injectable } from '@nestjs/common';
import { ID, IReservation, ReservationDto, ReservationSearchOptions } from './interfaces/reservation';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';
import { ReservationResponse } from 'src/api/reservation-api/interfaces/reservation-api';
import { HotelRoom, HotelRoomDocument } from 'src/hotel/schemas/hotel-room.schema';
import { HotelDocument } from 'src/hotel/schemas/hotel.schema';

@Injectable()
export class ReservationService implements IReservation {
  constructor(
    @InjectModel(Reservation.name) private readonly reservationModel: Model<ReservationDocument>,
    @InjectModel(HotelRoom.name) private readonly hotelRoomModel: Model<HotelRoomDocument>
) {}

  async addReservation(data: ReservationDto): Promise<ReservationResponse> {
    if (!Types.ObjectId.isValid(data.roomId)) throw new BadRequestException('Invalid HotelRoom id');

    const hotelRoom = await this.hotelRoomModel.findById(data.roomId);
    if (!hotelRoom) throw new BadRequestException('Hotel room not exist or not available');

    const busyReservations = await this.reservationModel.find({
      roomId: data.roomId,
      $or: [
        { dateStart: { $lt: data.dateEnd, $gte: data.dateStart } },
        { dateEnd: { $gt: data.dateStart, $lte: data.dateEnd } },
        { dateStart: { $lte: data.dateStart }, dateEnd: { $gte: data.dateEnd } }
      ]
    });
    if (busyReservations.length) throw new Error('Room is not available for the selected dates');

    const newReservation = await new this.reservationModel(data).save();

    const reservation = await this.reservationModel
      .findById(newReservation._id)
      .populate<{ roomId: HotelRoomDocument & { hotel: HotelDocument } }>({
        path: 'roomId',
        model: 'HotelRoom',
        populate: {
          path: 'hotel',
          model: 'Hotel'
        }
      })
      .exec();

    return {
      startDate: reservation.dateStart,
      endDate: reservation.dateEnd,
      hotelRoom: {
        description: reservation.roomId.description,
        images: reservation.roomId.images
      },
      hotel: {
        title: reservation.roomId.hotel.title,
        description: reservation.roomId.hotel.description
      }
    };
  }

  async removeReservation(id: ID): Promise<void> {
    await this.reservationModel.findByIdAndDelete(id).exec();
  }

  async getReservations(filter: ReservationSearchOptions): Promise<ReservationResponse[]> {
    const reservations = await this.reservationModel
      .find({
        ...(filter.userId && { userId: filter.userId }),
        ...(filter.dateStart && { dateStart: { $gte: filter.dateStart } }),
        ...(filter.dateEnd && { dateEnd: { $lte: filter.dateEnd } })
      })
      .populate<{ roomId: HotelRoomDocument & { hotel: HotelDocument } }>({
        path: 'roomId',
        model: 'HotelRoom',
        populate: {
          path: 'hotel',
          model: 'Hotel'
        }
      })
      .exec();

    return reservations.map(reservation => {
      return {
        startDate: reservation.dateStart,
        endDate: reservation.dateEnd,
        hotelRoom: {
          description: reservation.roomId.description,
          images: reservation.roomId.images
        },
        hotel: {
          title: reservation.roomId.hotel.title,
          description: reservation.roomId.hotel.description
        }
      };
    });
  }

  async getReservationById(id: ID): Promise<ReservationDocument> {
    return await this.reservationModel.findById(id).exec();
  }
}