import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../interfaces/user';
import { IsEnum } from 'class-validator';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  contactPhone: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.CLIENT })
  @IsEnum(UserRole)
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);