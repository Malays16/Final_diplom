import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationService } from './reservation.service';
import { Reservation, ReservationSchema } from './schemas/reservation.schema';
import { ReservationController } from './reservation.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }])],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService, MongooseModule]
})
export class ReservationModule {}