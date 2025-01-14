import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationService } from './reservation.service';
import { Reservation, ReservationSchema } from './schemas/reservation.schema';
import { ReservationController } from './reservation.controller';
import { HotelModule } from 'src/hotel/hotel.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }]),
    HotelModule
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService, MongooseModule]
})
export class ReservationModule {}