import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { HotelModule } from './hotel/hotel.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    UserModule,
    HotelModule,
    ReservationModule
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}