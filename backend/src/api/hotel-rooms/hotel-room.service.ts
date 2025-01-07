import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SearchHotelRoomInterface } from './interfaces/hotel-room';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { HotelRoom, HotelRoomDocument } from 'src/hotel/schemas/hotel-room.schema';
import { HotelDocument } from 'src/hotel/schemas/hotel.schema';
import { Reservation, ReservationDocument } from 'src/reservation/schemas/reservation.schema';
import { ID } from 'src/hotel/interfaces/hotel-room';

@Injectable()
export class HotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name) private readonly hotelRoomModel: Model<HotelRoomDocument>,
    @InjectModel(Reservation.name) private readonly reservationModel: Model<ReservationDocument>
  ) {}

  private async getReservedRoomIds(hotel: string, checkIn: Date, checkOut: Date): Promise<Types.ObjectId[]> {
    try {
      const reservedRooms = await this.reservationModel
        .find({
          hotelId: hotel,
          $or: [
            { dateStart: { $lt: checkOut, $gte: checkIn } },
            { dateEnd: { $gt: checkIn, $lte: checkOut } },
            { dateStart: { $lte: checkIn }, dateEnd: { $gte: checkOut } }
          ]
        })
        .select('roomId');

      return Array.from(new Set(reservedRooms.map(reservation => reservation.roomId)));
    } catch (error) {
      throw new InternalServerErrorException('Failed to get reserved rooms', error);
    }
  }

  async searchHotelRooms(limit: number, offset: number, hotel: string, checkIn: Date, checkOut: Date): Promise<SearchHotelRoomInterface[]> {
    try {
      const reservedRoomIds = await this.getReservedRoomIds(hotel, checkIn, checkOut);

      const availableRooms = await this.hotelRoomModel
        .find({ hotel, _id: { $nin: reservedRoomIds } })
        .populate<{ hotel: HotelDocument }>('hotel')
        .limit(limit)
        .skip(offset)
        .exec();

      return availableRooms.map(room => {
        return {
          id: room.id,
          description: room.description,
          images: room.images,
          hotel: {
            id: room.hotel.id,
            title: room.hotel.title
          }
        };
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to search hotel rooms', error);
    }
  }

  async getRoomInfo(id: ID): Promise<SearchHotelRoomInterface> {
    try {
      const room = await this.hotelRoomModel.findById(id).populate<{ hotel: HotelDocument }>('hotel').exec();

      return {
        id: room.id,
        description: room.description,
        images: room.images,
        hotel: {
          id: room.hotel.id,
          title: room.hotel.title,
          description: room.hotel.description
        }
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to get room info', error);
    }
  }
}