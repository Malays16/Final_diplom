import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ID, IUserService, SearchUserParams, UserDto, UserResponse } from './interfaces/user';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService implements IUserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async hashPass(pass: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(pass, salt);
  }

  async create(data: UserDto): Promise<UserDocument> {
    const existUser = await this.findByEmail(data.email);
    if (existUser) throw new BadRequestException('User with this email exist');

    const { password, ...userData } = data;
    userData.passwordHash = await this.hashPass(password);

    const user = new this.userModel(userData);
    return user.save();
  }

  async update(id: ID, data: Partial<User>): Promise<UserDocument> {
    return await this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: ID): Promise<UserDocument> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }

  async findById(id: ID): Promise<UserDocument> {
    return await this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findAll(params: SearchUserParams): Promise<UserResponse[]> {
    const query = {
      ...(params.email && { email: { $regex: params.email, $options: 'i' } }),
      ...(params.name && { name: { $regex: params.name, $options: 'i' } }),
      ...(params.contactPhone && { contactPhone: { $regex: params.contactPhone, $options: 'i' } })
    };
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