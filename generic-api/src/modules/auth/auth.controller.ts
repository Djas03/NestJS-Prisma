import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userDTO } from '../users/dto/user.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  signIn(@Body() data: userDTO){
    return this.authService.signIn(data.email, data.password);
  }

  
}
