import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ required: true })
  author: string;

  @Prop({ required: true, default: Date.now })
  sentAt: Date;

  @Prop({ required: true })
  text: string;

  @Prop()
  readAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'SupportRequest', required: true })
  supportRequest: Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);