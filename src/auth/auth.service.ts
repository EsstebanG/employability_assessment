import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwt: JwtService,
    ) {}

    async register(dto: RegisterDto) {
        const existing = await this.usersService.findByEmailWithPassword(dto.email);
        if (existing) {
            throw new ConflictException('Email already registered');
        }

        const hashed = await bcrypt.hash(dto.password, 10);
        const user = await this.usersService.createCoder({
            name: dto.name,
            email: dto.email,
            password: hashed,
        });

        return this.buildAuthResponse(user.id, user.email, user.role);
    }

    async login(dto: LoginDto) {
      const user = await this.usersService.findByEmailWithPassword(dto.email);
      if (!user) throw new UnauthorizedException('Invalid credentials');

      const ok = await bcrypt.compare(dto.password, user.password);
      if (!ok) throw new UnauthorizedException('Invalid credentials');

      return this.buildAuthResponse(user.id, user.email, user.role);
    }

    private buildAuthResponse(userId: string, email: string, role: string) {
      const accessToken = this.jwt.sign(
        { email, role },
        { subject: userId },
      );
      
      return {
        accessToken,
        tokenType: 'Bearer',
      };
    }
}
