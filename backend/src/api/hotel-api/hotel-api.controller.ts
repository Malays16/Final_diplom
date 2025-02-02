import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { HotelService } from 'src/hotel/hotel.service';
import { CreateHotelDto, HotelDtoResponse } from './interfaces/hotel-api';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from 'src/user/interfaces/user';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ID, UpdateHotelParams } from 'src/hotel/interfaces/hotel';

@Controller('api/admin')
export class HotelApiController {
  constructor(private readonly hotelService: HotelService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @Post('hotels')
  async createHotel(@Body() createHotelDto: CreateHotelDto): Promise<HotelDtoResponse> {
    const { id } = await this.hotelService.create(createHotelDto);
    return {
      id: id,
      title: createHotelDto.title,
      description: createHotelDto.description
    };
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Get('hotels')
  async getHotels(
    @Query('limit') limit: number = 5,
    @Query('offset') offset: number = 0,
    @Query('title') title: string
  ): Promise<HotelDtoResponse[]> {
    const hotels = await this.hotelService.search({ limit, offset, title });
    return hotels.map(hotel => {
      return {
        id: hotel.id,
        title: hotel.title,
        description: hotel.description
      };
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Put('hotels/:id')
  async updateHotel(@Param('id') id: ID, @Body() updateHotelDto: UpdateHotelParams): Promise<HotelDtoResponse> {
    const updatedHotel = await this.hotelService.update(id, updateHotelDto);
    return {
      id: updatedHotel.id,
      title: updatedHotel.title,
      description: updatedHotel.description
    };
  }
}