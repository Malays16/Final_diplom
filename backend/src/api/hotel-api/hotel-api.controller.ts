import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { HotelService } from 'src/hotel/hotel.service';
import { CreateHotelDto, HotelDtoResponse } from './interfaces/hotel-api';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/user/interfaces/user';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Get('hotels')
  async getHotels(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0
  ): Promise<HotelDtoResponse[]> {
    const hotels = await this.hotelService.search({ limit, offset });
    return hotels.map(hotel => {
      return {
        id: hotel.id,
        title: hotel.title,
        description: hotel.description
      };
    });
  }
}