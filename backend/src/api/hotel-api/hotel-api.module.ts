import { Module } from '@nestjs/common';
import { HotelApiController } from './hotel-api.controller';
import { HotelService } from 'src/hotel/hotel.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from 'src/hotel/schemas/hotel.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema },
      { name: User.name, schema: UserSchema }
    ])
  ],
  controllers: [HotelApiController],
  providers: [HotelService, UserService],
  exports: [HotelService, UserService]
})
export class HotelApiModule {}