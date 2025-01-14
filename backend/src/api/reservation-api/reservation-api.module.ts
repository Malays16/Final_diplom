import { Module } from '@nestjs/common';
import { ReservationApiClientController } from './reservation-api-client.controller';
import { HotelModule } from 'src/hotel/hotel.module';
import { ReservationModule } from 'src/reservation/reservation.module';
import { ReservationApiManagerController } from './reservation-api-manager.controller';

@Module({
  imports: [ReservationModule, HotelModule],
  controllers: [ReservationApiClientController, ReservationApiManagerController]
})
export class ReservationApiModule {}