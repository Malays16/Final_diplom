import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserDocument } from './schemas/user.schema';
import { ID, SearchUserParams } from './interfaces/user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() userData: Partial<User>): Promise<UserDocument> {
    return this.userService.create(userData);
  }

  @Get(':id')
  async findById(@Param('id') id: ID): Promise<UserDocument | null> {
    return this.userService.findById(id);
  }

  @Get()
  async findAll(@Query() query: SearchUserParams): Promise<UserDocument[]> {
    return this.userService.findAll(query);
  }
}