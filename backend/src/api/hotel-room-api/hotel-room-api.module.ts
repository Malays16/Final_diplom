import { Module } from '@nestjs/common';
import { HotelRoomApiCommonController } from './hotel-room-api-common.controller';
import { HotelRoomApiAdminController } from './hotel-room-api-admin.controller';
import { HotelRoomApiService } from './hotel-room-api.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelRoom, HotelRoomSchema } from 'src/hotel/schemas/hotel-room.schema';
import { Reservation, ReservationSchema } from 'src/reservation/schemas/reservation.schema';
import { HotelModule } from 'src/hotel/hotel.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HotelRoom.name, schema: HotelRoomSchema },
      { name: Reservation.name, schema: ReservationSchema }
    ]),
    HotelModule
  ],
  controllers: [HotelRoomApiCommonController, HotelRoomApiAdminController],
  providers: [HotelRoomApiService],
  exports: [HotelRoomApiService]
})
export class HotelRoomApiModule {}