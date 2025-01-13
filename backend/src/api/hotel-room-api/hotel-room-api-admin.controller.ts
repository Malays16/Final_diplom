import { Body, Controller, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { HotelRoomService } from 'src/hotel/hotel-room.service';
import { ID } from 'src/hotel/interfaces/hotel-room';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from 'src/user/interfaces/user';
import { CreateRoomHotelDto, HotelRoomResponse, UpdateHotelRoomDto } from './interfaces/hotel-room-api';
import { HotelService } from 'src/hotel/hotel.service';

@Controller('api/admin')
export class HotelRoomApiAdminController {
  constructor(
    private readonly hotelRoomService: HotelRoomService,
    private readonly hotelService: HotelService
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @Post('hotel-rooms')
  async createHotelRoom(@Body() createHotelRoomDto: CreateRoomHotelDto): Promise<HotelRoomResponse> {
    const hotel = await this.hotelService.findById(createHotelRoomDto.hotelId);
    const hotelRoomDto = { ...createHotelRoomDto, hotel: hotel.id };
    const hotelRoom = await this.hotelRoomService.create(hotelRoomDto);
    return {
      id: hotelRoom.id,
      description: hotelRoom.description,
      images: hotelRoom.images,
      isEnabled: hotelRoom.isEnabled,
      hotel: {
        id: hotel.id,
        title: hotel.title,
        description: hotel.description
      }
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Put('hotel-rooms/:id')
  async updateHotelRoom(@Param('id') id: ID, @Body() updateHotelRoomDto: UpdateHotelRoomDto): Promise<HotelRoomResponse> {
    const hotel = await this.hotelService.findById(updateHotelRoomDto.hotelId);
    const hotelRoomDto = { ...updateHotelRoomDto, hotel: hotel.id };
    const hotelRoom = await this.hotelRoomService.update(id, hotelRoomDto);
    return {
      id,
      description: hotelRoom.description,
      images: hotelRoom.images,
      isEnabled: hotelRoom.isEnabled,
      hotel: {
        id: hotel.id,
        title: hotel.title,
        description: hotel.description
      }
    };
  }
}