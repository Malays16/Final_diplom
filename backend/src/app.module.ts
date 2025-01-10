import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { HotelModule } from './hotel/hotel.module';
import { ReservationModule } from './reservation/reservation.module';
import { SupportChatModule } from './support-chat/support-chat.module';
import { HotelRoomApiModule } from './api/hotel-room-api/hotel-room-api.module';
import { AuthModule } from './api/auth/auth.module';
import { HotelApiModule } from './api/hotel-api/hotel-api.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    UserModule,
    HotelModule,
    ReservationModule,
    SupportChatModule,
    HotelRoomApiModule,
    AuthModule,
    HotelApiModule,
  ]
})
export class AppModule {}