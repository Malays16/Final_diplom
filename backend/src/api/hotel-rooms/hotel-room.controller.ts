import { Controller, Get, Param, Query } from '@nestjs/common';
import { HotelRoomService } from './hotel-room.service';
import { SearchHotelRoomInterface } from './interfaces/hotel-room';
import { ID } from 'src/hotel/interfaces/hotel-room';

@Controller('api/common')
export class HotelRoomController {
  constructor(private readonly hotelRoomService: HotelRoomService) {}

  @Get('hotel-rooms')
  async getHotelRooms(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
    @Query('hotel') hotel: string,
    @Query('checkIn') checkIn: string,
    @Query('checkOut') checkOut: string
  ): Promise<SearchHotelRoomInterface[]> {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    try {
      const rooms = await this.hotelRoomService.searchHotelRooms(limit, offset, hotel, checkInDate, checkOutDate);
      return rooms;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get('hotel-rooms/:id')
  async getRoomInfo(@Param('id') id: ID): Promise<SearchHotelRoomInterface> {
    try {
      const room = await this.hotelRoomService.getRoomInfo(id);
      return room;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}