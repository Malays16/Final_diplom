import { Module } from '@nestjs/common';
import { HotelRoomController } from './hotel-room.controller';
import { HotelRoomService } from './hotel-room.service';
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
  controllers: [HotelRoomController],
  providers: [HotelRoomService],
  exports: [HotelRoomService]
})
export class HotelRoomModule {}