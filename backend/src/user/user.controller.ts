import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserDocument } from './schemas/user.schema';
import { ID, SearchUserParams, UserResponse } from './interfaces/user';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() userData: User): Promise<UserDocument> {
    return this.userService.create(userData);
  }

  @Get(':id')
  async findById(@Param('id') id: ID): Promise<UserDocument | null> {
    return this.userService.findById(id);
  }

  @Get()
  async findAll(@Query() query: SearchUserParams): Promise<UserResponse[]> {
    return this.userService.findAll(query);
  }
}