import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ID, IUserService, SearchUserParams, UserResponse } from './interfaces/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements IUserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  private async hashPass(pass: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(pass, salt);
  }

  async create(data: Partial<User>): Promise<UserDocument> {
    const existUser = await this.findByEmail(data.email);
    if (existUser) throw new BadRequestException('User with this email exist');

    data.passwordHash = await this.hashPass(data.passwordHash);

    const user = new this.userModel(data);
    return user.save();
  }

  async findById(id: ID): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async findAll(params: SearchUserParams): Promise<UserResponse[]> {
    const query = {
      ...(params.email && { email: { $regex: params.email, $options: 'i' } }),
      ...(params.name && { name: { $regex: params.name, $options: 'i' } }),
      ...(params.contactPhone && { contactPhone: { $regex: params.contactPhone, $options: 'i' } }),
    }
    const users = await this.userModel.find(query).skip(params.offset).limit(params.limit).exec();
    return users.map(user => {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        contactPhone: user.contactPhone
      };
    });
  }
}