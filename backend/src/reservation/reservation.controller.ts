import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ID, ReservationDto, ReservationSearchOptions } from './interfaces/reservation';
import { ReservationDocument } from './schemas/reservation.schema';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('add')
  async addReservation(@Body() data: ReservationDto): Promise<ReservationDocument> {
    return this.reservationService.addReservation(data);
  }

  @Delete(':id')
  async removeReservation(@Param('id') id: ID): Promise<void> {
    return this.reservationService.removeReservation(id);
  }

  @Get()
  async getReservations(@Query() filter: ReservationSearchOptions): Promise<ReservationDocument[]> {
    return this.reservationService.getReservations(filter);
  }
}