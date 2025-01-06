import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Hotel', required: true })
  hotelId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'HotelRoom', required: true })
  roomId: Types.ObjectId;

  @Prop({ type: Date, required: true })
  dateStart: Date;

  @Prop({ type: Date, required: true })
  dateEnd: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);