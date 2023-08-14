import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../token/token.service';
import * as dotenv from 'dotenv';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private tokenService: TokenService
    ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!bcrypt.compareSync(pass, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.email };
    const token = await this.jwtService.signAsync(payload);
    this.tokenService.save(token, user.email);
    return {
      access_token: token,
    }

  }

  async signInRefreshToken(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!(pass == user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.email };
    const token = await this.jwtService.signAsync(payload);
    this.tokenService.save(token, user.email);
    return {
      access_token: token,
    }

  }
}
