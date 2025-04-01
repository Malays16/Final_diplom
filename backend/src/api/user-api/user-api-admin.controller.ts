import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ID, SearchUserParams, UserDto, UserResponse, UserRole } from 'src/user/interfaces/user';

@Controller('api/admin')
export class UserApiAdminController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('users')
  async createUser(@Body() data: UserDto): Promise<UserDocument> {
    return await this.userService.create(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @HttpCode(HttpStatus.OK)
  @Get('users')
  async getUsers(@Query() query: SearchUserParams): Promise<UserResponse[]> {
    return await this.userService.findAll(query);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @HttpCode(HttpStatus.OK)
  @Put('users/:id')
  async updateUser(@Param('id') id: ID, @Body() data: Partial<User>): Promise<UserDocument> {
    return await this.userService.update(id, data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('users/:id')
  async deleteUser(@Param('id') id: ID): Promise<UserDocument> {
    return await this.userService.delete(id);
  }
}