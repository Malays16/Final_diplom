import { Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDocument } from 'src/user/schemas/user.schema';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterResponse } from './interfaces/auth';
import { NotAuthGuard } from './guards/not-auth-guard';

type ReqUser = Request & { user: UserDocument };

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('auth/login')
  async login(@Req() req: ReqUser, @Res() res: Response): Promise<void> {
    const user = await this.authService.login(req.user);
    res.cookie('access_token', user.access_token, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.json({ email: user.email, name: user.name, contactPhone: user.contactPhone });
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('auth/logout')
  async logout(@Req() _: ReqUser, @Res() res: Response) {
    res.clearCookie('access_token', { httpOnly: true, secure: true, sameSite: 'strict' });
    res.end();
  }

  @UseGuards(NotAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('client/register')
  async register(@Req() req: Request): Promise<RegisterResponse> {
    const { email, password, name, contactPhone } = req.body;
    const user = await this.authService.register({ email, password, name, contactPhone });
    return { id: user.id, email, name };
  }
}