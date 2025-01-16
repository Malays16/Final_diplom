import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { HotelRoomService } from './hotel-room.service';
import { ID, SearchRoomsParams } from './interfaces/hotel-room';
import { HotelRoom, HotelRoomDocument } from './schemas/hotel-room.schema';

@Controller('hotel-rooms')
export class HotelRoomController {
  constructor(private readonly hotelRoomService: HotelRoomService) {}

  @Post('create')
  async create(@Body() roomData: Partial<HotelRoom>): Promise<HotelRoomDocument> {
    return this.hotelRoomService.create(roomData);
  }

  @Get(':id')
  async findById(@Param('id') id: ID): Promise<HotelRoomDocument | null> {
    return this.hotelRoomService.findById(id);
  }

  @Get()
  async search(@Query() query: SearchRoomsParams): Promise<HotelRoomDocument[]> {
    return this.hotelRoomService.search(query);
  }

  @Put(':id')
  async update(@Param('id') id: ID, @Body() updateParams: Partial<HotelRoom>): Promise<HotelRoomDocument> {
    return this.hotelRoomService.update(id, updateParams);
  }
}