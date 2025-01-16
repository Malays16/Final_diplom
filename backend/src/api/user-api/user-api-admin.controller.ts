import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { SearchUserParams, UserResponse, UserRole } from 'src/user/interfaces/user';

@Controller('api/admin')
export class UserApiAdminController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @Post('users')
  async createUser(@Body() data: User): Promise<UserDocument> {
    return await this.userService.create(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Get('users')
  async getUsers(@Query() query: SearchUserParams): Promise<UserResponse[]> {
    return await this.userService.findAll(query);
  }
}