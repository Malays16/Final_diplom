import { Module } from '@nestjs/common';
import { HotelRoomApiCommonController } from './hotel-room-api-common.controller';
import { HotelRoomApiAdminController } from './hotel-room-api-admin.controller';
import { HotelRoomApiService } from './hotel-room-api.service';
import { HotelModule } from 'src/hotel/hotel.module';
import { ReservationModule } from 'src/reservation/reservation.module';

@Module({
  imports: [
    HotelModule,
    ReservationModule,
  ],
  controllers: [HotelRoomApiCommonController, HotelRoomApiAdminController],
  providers: [HotelRoomApiService],
  exports: [HotelRoomApiService]
})
export class HotelRoomApiModule {}