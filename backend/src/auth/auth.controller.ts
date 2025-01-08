import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDocument } from 'src/user/schemas/user.schema';
import { type Request as Req } from 'express';
type ReqUser = Req & { user: UserDocument };

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Request() req: ReqUser) {
    return this.authService.login(req.user);
  }
}