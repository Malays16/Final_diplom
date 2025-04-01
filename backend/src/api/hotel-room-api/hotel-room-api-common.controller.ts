import { Controller, Get, HttpCode, HttpStatus, Param, Query } from '@nestjs/common';
import { HotelRoomApiService } from './hotel-room-api.service';
import { SearchHotelRoomInterface } from './interfaces/hotel-room-api';
import { ID } from 'src/hotel/interfaces/hotel-room';

@Controller('api/common')
export class HotelRoomApiCommonController {
  constructor(private readonly hotelRoomService: HotelRoomApiService) {}

  @Get('hotel-rooms')
  @HttpCode(HttpStatus.OK)
  async getHotelRooms(
    @Query('limit') limit: number = 5,
    @Query('offset') offset: number = 0,
    @Query('hotel') hotel: string,
    @Query('checkIn') checkIn: string,
    @Query('checkOut') checkOut: string
  ): Promise<SearchHotelRoomInterface[]> {
    const checkInDate = checkIn ? new Date(checkIn) : null;
    const checkOutDate = checkOut ? new Date(checkOut) : null;
    try {
      const rooms = await this.hotelRoomService.searchHotelRooms(limit, offset, hotel, checkInDate, checkOutDate);
      return rooms;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get('hotel-rooms/:id')
  @HttpCode(HttpStatus.OK)
  async getRoomInfo(@Param('id') id: ID): Promise<SearchHotelRoomInterface> {
    try {
      const room = await this.hotelRoomService.getRoomInfo(id);
      return room;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}