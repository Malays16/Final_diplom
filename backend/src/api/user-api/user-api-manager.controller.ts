import { Controller, Get, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { SearchUserParams, UserResponse, UserRole } from 'src/user/interfaces/user';

@Controller('api/manager')
export class UserApiManagerController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MANAGER)
  @HttpCode(HttpStatus.OK)
  @Get('users')
  async getUsers(@Query() query: SearchUserParams): Promise<UserResponse[]> {
    return await this.userService.findAll(query);
  }
}