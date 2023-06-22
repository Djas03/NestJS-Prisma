import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { RefreshTokenDTO } from './dto/refresh.token.dto';


@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Put('refresh')
  async refreshToken(@Body() data: RefreshTokenDTO){
      return this.tokenService.refreshToken(data.oldToken);
  }
}
