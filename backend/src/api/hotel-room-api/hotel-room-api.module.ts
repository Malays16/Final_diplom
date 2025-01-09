import { Module } from '@nestjs/common';
import { HotelRoomApiController } from './hotel-room-api.controller';
import { HotelRoomApiService } from './hotel-room-api.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelRoom, HotelRoomSchema } from 'src/hotel/schemas/hotel-room.schema';
import { Reservation, ReservationSchema } from 'src/reservation/schemas/reservation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HotelRoom.name, schema: HotelRoomSchema },
      { name: Reservation.name, schema: ReservationSchema }
    ]),
  ],
  controllers: [HotelRoomApiController],
  providers: [HotelRoomApiService],
  exports: [HotelRoomApiService]
})
export class HotelRoomApiModule {}