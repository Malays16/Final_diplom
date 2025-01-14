import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ReservationService } from 'src/reservation/reservation.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from 'src/user/interfaces/user';
import { HotelRoomService } from 'src/hotel/hotel-room.service';
import { CreateReservationDto, ReservationResponse } from './interfaces/reservation-api';
import { ID } from 'src/reservation/interfaces/reservation';
import { ReqUser } from '../auth/interfaces/auth';

@Controller('/api/client')
export class ReservationApiClientController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly hotelRoomService: HotelRoomService
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  @HttpCode(HttpStatus.CREATED)
  @Post('reservations')
  async createReservation(@Body() data: CreateReservationDto, @Req() request: ReqUser): Promise<ReservationResponse> {
    const hotelRoom = await this.hotelRoomService.findById(data.hotelRoom);
    const reservationDto = {
      userId: request.user.id,
      hotelId: hotelRoom.hotel.toString(),
      roomId: data.hotelRoom,
      dateStart: data.startDate,
      dateEnd: data.endDate
    };
    return await this.reservationService.addReservation(reservationDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  @HttpCode(HttpStatus.OK)
  @Get('reservations')
  async getReservations(@Req() request: ReqUser): Promise<ReservationResponse[]> {
    return this.reservationService.getReservations({ userId: request.user.id });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('reservations/:id')
  async removeReservation(@Param('id') id: ID, @Req() request: ReqUser): Promise<void> {
    const reservation = await this.reservationService.getReservationById(id);
    if (!reservation) throw new BadRequestException('Reservation not found');
    if (reservation.userId !== request.user.id) throw new ForbiddenException('You do not have permission to cancel reservation');
    await this.reservationService.removeReservation(id);
  }
}