import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HotelRoom, HotelRoomDocument } from './schemas/hotel-room.schema';
import { ID, IHotelRoomService, SearchRoomsParams } from './interfaces/hotel-room';

@Injectable()
export class HotelRoomService implements IHotelRoomService {
  constructor(@InjectModel(HotelRoom.name) private readonly hotelRoomModel: Model<HotelRoomDocument>) {}

  async create(data: Partial<HotelRoom>): Promise<HotelRoomDocument> {
    data.createdAt = new Date();
    data.updatedAt = new Date();
    const room = new this.hotelRoomModel(data);
    return room.save();
  }

  async findById(id: ID): Promise<HotelRoomDocument> {
    return this.hotelRoomModel.findById(id).exec();
  }

  async search(params: SearchRoomsParams): Promise<HotelRoomDocument[]> {
    const query: Partial<SearchRoomsParams> = { hotel: params.hotel };
    if (params.isEnabled) {
      query.isEnabled = params.isEnabled;
    }
    return this.hotelRoomModel.find(query).limit(params.limit).skip(params.offset).exec();
  }

  async update(id: ID, params: Partial<HotelRoom>): Promise<HotelRoomDocument> {
    params.updatedAt = new Date();
    return this.hotelRoomModel.findByIdAndUpdate(id, params, { new: true }).exec();
  }
}