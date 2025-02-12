import { Body, Controller, HttpCode, HttpStatus, Param, Post, Put, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { HotelRoomService } from 'src/hotel/hotel-room.service';
import { ID } from 'src/hotel/interfaces/hotel-room';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from 'src/user/interfaces/user';
import { CreateRoomHotelDto, HotelRoomResponse, UpdateHotelRoomDto } from './interfaces/hotel-room-api';
import { HotelService } from 'src/hotel/hotel.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api/admin')
export class HotelRoomApiAdminController {
  constructor(
    private readonly hotelRoomService: HotelRoomService,
    private readonly hotelService: HotelService
  ) {}

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @Post('hotel-rooms')
  async createHotelRoom(@Body() createHotelRoomDto: CreateRoomHotelDto): Promise<HotelRoomResponse> {
    const hotel = await this.hotelService.findById(createHotelRoomDto.hotelId);
    const hotelRoomDto = { ...createHotelRoomDto, hotel: hotel.id };
    const hotelRoom = await this.hotelRoomService.create(hotelRoomDto);
    return {
      id: hotelRoom.id,
      title: hotelRoom.title,
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

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Put('hotel-rooms/:id')
  async updateHotelRoom(@Param('id') id: ID, @Body() updateHotelRoomDto: UpdateHotelRoomDto): Promise<HotelRoomResponse> {
    const hotel = await this.hotelService.findById(updateHotelRoomDto.hotelId);
    const hotelRoomDto = { ...updateHotelRoomDto, hotel: hotel.id };
    const hotelRoom = await this.hotelRoomService.update(id, hotelRoomDto);
    return {
      id,
      title: hotelRoom.title,
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

  @HttpCode(HttpStatus.CREATED)
  @Post('hotel-rooms/upload')
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      storage: diskStorage({
        destination: './public/images/hotel-rooms',
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