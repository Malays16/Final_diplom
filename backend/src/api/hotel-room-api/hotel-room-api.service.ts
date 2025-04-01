import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SearchHotelRoomInterface } from './interfaces/hotel-room-api';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { HotelRoom, HotelRoomDocument } from 'src/hotel/schemas/hotel-room.schema';
import { HotelDocument } from 'src/hotel/schemas/hotel.schema';
import { Reservation, ReservationDocument } from 'src/reservation/schemas/reservation.schema';
import { ID } from 'src/hotel/interfaces/hotel-room';

@Injectable()
export class HotelRoomApiService {
  constructor(
    @InjectModel(HotelRoom.name) private readonly hotelRoomModel: Model<HotelRoomDocument>,
    @InjectModel(Reservation.name) private readonly reservationModel: Model<ReservationDocument>
  ) {}

  private async getReservedRoomIds(
    hotel: string | null | undefined,
    checkIn: Date | undefined,
    checkOut: Date | undefined
  ): Promise<Types.ObjectId[]> {
    try {
      if (!checkIn || !checkOut) {
        return [];
      }

      const query: any = {
        $or: [
          { dateStart: { $lt: checkOut, $gte: checkIn } },
          { dateEnd: { $gt: checkIn, $lte: checkOut } },
          { dateStart: { $lte: checkIn }, dateEnd: { $gte: checkOut } }
        ]
      };

      if (hotel) {
        query.hotelId = hotel;
      }

      const reservedRooms = await this.reservationModel.find(query).select('roomId');

      return Array.from(new Set(reservedRooms.map(reservation => reservation.roomId)));
    } catch (error) {
      throw new InternalServerErrorException('Failed to get reserved rooms', error);
    }
  }

  async searchHotelRooms(limit: number, offset: number, hotel?: string, checkIn?: Date, checkOut?: Date): Promise<SearchHotelRoomInterface[]> {
    try {
      const query: any = {};
      let reservedRoomIds: Types.ObjectId[] = [];
      if (hotel) {
        query.hotel = hotel;
      }

      if (checkIn instanceof Date && checkOut instanceof Date) {
        if (checkIn >= checkOut) {
          throw new BadRequestException('Check out date must be greater than check in date');
        }

        reservedRoomIds = await this.getReservedRoomIds(hotel, checkIn, checkOut);

        if (reservedRoomIds.length > 0) {
          query._id = { $nin: reservedRoomIds };
        }
      }

      const availableRooms = await this.hotelRoomModel.find(query).populate<{ hotel: HotelDocument }>('hotel').limit(limit).skip(offset).exec();

      return availableRooms.map(room => {
        return {
          id: room.id,
          title: room.title,
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
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid room id', 400);
    try {
      const room = await this.hotelRoomModel.findById(id).populate<{ hotel: HotelDocument }>('hotel').exec();

      return {
        id: room.id,
        title: room.title,
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