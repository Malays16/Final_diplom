import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SupportRequestDocument = SupportRequest & Document;

@Schema()
export class SupportRequest {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true, default: () => Date.now() })
  createdAt: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Message', default: [] }] })
  messages: Types.ObjectId[];

  @Prop({ required: true })
  isActive: boolean;
}

export const SupportRequestSchema = SchemaFactory.createForClass(SupportRequest);