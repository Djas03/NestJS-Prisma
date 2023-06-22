import { Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class TokenService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
    ) {}

  async save( hash: string, username: string) {
    let objectoken = await this.prisma.token.findFirst({
      where:{
        username: username,
      }
    })

    if(objectoken){
      this.update(objectoken.id, hash);
    }else{
      await this.prisma.token.create({
        data:{
          hash: hash,
          username: username,
        }
      });
    }

  }

  async update(id: string, hash: string){
    const token = await this.prisma.token.update({
      data: {
        hash: hash
      },
      where:{
        id: id,
      }
    })

  }


  async refreshToken(oldToken: string){
    let objectToken = await this.prisma.token.findFirst({
      where:{
        hash: oldToken
      }
    })

    if(objectToken){
      let user = await this.usersService.findOneByEmail(objectToken.username);
      return this.authService.signInRefreshToken(user.email,user.password);
    }else{
      throw new UnauthorizedException();
    }
  }

}
