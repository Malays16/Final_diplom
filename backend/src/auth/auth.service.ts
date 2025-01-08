import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserDocument } from 'src/user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse, PayloadToken } from './interfaces/auth';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<UserDocument | null> {
    const user = await this.userService.findByEmail(email);
    const passIsMatch = await bcrypt.compare(pass, user.passwordHash);

    if (!user || !passIsMatch) {
      throw new UnauthorizedException('User or password are incorrect');
    }

    return user;
  }

  async validateJwt(email: string): Promise<UserDocument | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  async login(user: UserDocument): Promise<LoginResponse> {
    const { id, email } = user;
    const token = this.createToken({ id, email });
    return { id, email, access_token: token };
  }

  private createToken(payload: PayloadToken) {
    return this.jwtService.sign(payload);
  }
}