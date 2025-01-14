import { BadRequestException, Controller, Delete, Get, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { ReservationService } from 'src/reservation/reservation.service';
import { ID as UserId, UserRole } from 'src/user/interfaces/user';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ReservationResponse } from './interfaces/reservation-api';
import { ID as ReservationId } from 'src/reservation/interfaces/reservation';

@Controller('api/manager')
export class ReservationApiManagerController {
  constructor(private readonly reservationService: ReservationService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MANAGER)
  @HttpCode(HttpStatus.OK)
  @Get('reservations/:userId')
  async getReservationsByUserId(@Param('userId') userId: UserId): Promise<ReservationResponse[]> {
    return await this.reservationService.getReservations({ userId });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MANAGER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('reservations/:id')
  async cancelReservation(@Param('id') id: ReservationId): Promise<void> {
    const reservation = await this.reservationService.getReservationById(id);
    if (!reservation) throw new BadRequestException('Reservation not found');
    await this.reservationService.removeReservation(id);
  }
}