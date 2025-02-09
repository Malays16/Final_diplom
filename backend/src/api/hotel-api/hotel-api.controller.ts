import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { HotelService } from 'src/hotel/hotel.service';
import { CreateHotelDto, HotelDtoResponse } from './interfaces/hotel-api';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from 'src/user/interfaces/user';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ID, UpdateHotelParams } from 'src/hotel/interfaces/hotel';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api/admin')
export class HotelApiController {
  constructor(private readonly hotelService: HotelService) {}

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @Post('hotels')
  async createHotel(
    @Body() createHotelDto: CreateHotelDto,
  ): Promise<HotelDtoResponse> {
    const { id } = await this.hotelService.create(createHotelDto);
    return {
      id: id,
      title: createHotelDto.title,
      description: createHotelDto.description,
      images: createHotelDto.images
    };
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Get('hotels')
  async getHotels(
    @Query('limit') limit: number = 5,
    @Query('offset') offset: number = 0,
    @Query('title') title: string,
  ): Promise<HotelDtoResponse[]> {
    const hotels = await this.hotelService.search({ limit, offset, title });
    return hotels.map(hotel => {
      return {
        id: hotel.id,
        title: hotel.title,
        description: hotel.description,
        images: hotel.images
      };
    });
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Get('hotels/:id')
  async getHotel(@Param('id') id: ID): Promise<HotelDtoResponse> {
    const hotel = await this.hotelService.findById(id);
    return {
      id: hotel.id,
      title: hotel.title,
      description: hotel.description,
      images: hotel.images
    };
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Put('hotels/:id')
  async updateHotel(
    @Param('id') id: ID,
    @Body() updateHotelDto: UpdateHotelParams,
  ): Promise<HotelDtoResponse> {
    const updatedHotel = await this.hotelService.update(id, updateHotelDto);
    return {
      id: updatedHotel.id,
      title: updatedHotel.title,
      description: updatedHotel.description,
      images: updatedHotel.images
    };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('hotels/upload')
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      storage: diskStorage({
        destination: './public/images/hotels',
        filename: (_, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        }
      })
    })
  )
  async uploadImage(@UploadedFiles() files: Express.Multer.File[]): Promise<{ images: string[] }> {
    const images = await Promise.all(
      files.map(async file => {
        return file.filename;
      })
    );
    return { images };
  }
}