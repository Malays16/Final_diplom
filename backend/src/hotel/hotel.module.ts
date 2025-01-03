import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelService } from './hotel.service';
import { HotelRoomService } from './hotel-room.service';
import { HotelSchema, Hotel } from './schemas/hotel.schema';
import { HotelRoomSchema, HotelRoom } from './schemas/hotel-room.schema';
import { HotelRoomController } from './hotel-room.controller';
import { HotelController } from './hotel.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema },
      { name: HotelRoom.name, schema: HotelRoomSchema }
    ])
  ],
  controllers: [HotelController, HotelRoomController],
  providers: [HotelService, HotelRoomService],
  exports: [HotelService, HotelRoomService]
})
export class HotelModule {}