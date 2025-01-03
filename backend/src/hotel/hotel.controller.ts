import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { ID, SearchHotelParams, UpdateHotelParams } from './interfaces/hotel';
import { Hotel, HotelDocument } from './schemas/hotel.schema';

@Controller('hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post('create')
  async create(@Body() hotelData: Partial<Hotel>): Promise<HotelDocument> {
    return this.hotelService.create(hotelData);
  }

  @Get(':id')
  async findById(@Param('id') id: ID): Promise<HotelDocument | null> {
    return this.hotelService.findById(id);
  }

  @Get()
  async search(@Query() query: SearchHotelParams): Promise<HotelDocument[]> {
    return this.hotelService.search(query);
  }

  @Put(':id')
  async update(@Param('id') id: ID, @Body() updateParams: UpdateHotelParams): Promise<HotelDocument> {
    return this.hotelService.update(id, updateParams);
  }
}