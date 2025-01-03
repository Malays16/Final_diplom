import { Injectable } from '@nestjs/common';
import { ID, IHotelService, SearchHotelParams, UpdateHotelParams } from './interfaces/hotel';
import { Hotel, HotelDocument } from './schemas/hotel.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class HotelService implements IHotelService {
  constructor(@InjectModel(Hotel.name) private readonly hotelModel: Model<HotelDocument>) {}

  async create(data: Partial<Hotel>): Promise<HotelDocument> {
    data.createdAt = new Date();
    data.updatedAt = new Date();
    const hotel = new this.hotelModel(data);
    return hotel.save();
  }

  async findById(id: ID): Promise<HotelDocument> {
    return this.hotelModel.findById(id).exec();
  }

  async search(params: SearchHotelParams): Promise<HotelDocument[]> {
    const query = {
      ...(params.title && { title: { $regex: params.title, $options: 'i' } })
    };
    return this.hotelModel
      .find(query)
      .skip(params.offset)
      .limit(params.limit)
      .exec();
  }

  async update(id: ID, params: UpdateHotelParams): Promise<HotelDocument> {
    params.updatedAt = new Date();
    return this.hotelModel.findByIdAndUpdate(id, params, { new: true }).exec();
  }
}