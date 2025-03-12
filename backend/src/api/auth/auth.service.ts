import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { UserDocument } from 'src/user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse, PayloadToken, RegisterDto } from './interfaces/auth';
import { UserRole } from 'src/user/interfaces/user';

@Injectable()
export class AuthService {
kk
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
    const { id, email, name, contactPhone, role } = user;
    const token = this.createToken({ id, email });
    return { email, name, contactPhone, role, access_token: token };
  }

  async register(registerDto: RegisterDto): Promise<UserDocument> {
    const existUser = await this.userService.findByEmail(registerDto.email);
    if (existUser) throw new BadRequestException('User with this email exist');

    try {
      return await this.userService.create({
        email: registerDto.email,
        passwordHash: registerDto.password,
        name: registerDto.name,
        contactPhone: registerDto.contactPhone,
        role: UserRole.CLIENT
      });
    } catch (error) {
      console.error('Error user register', error);
      throw new Error('Registration failed');
    }
  }

  private createToken(payload: PayloadToken) {
    return this.jwtService.sign(payload);
  }
}