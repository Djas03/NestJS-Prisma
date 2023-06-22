import { Module, forwardRef } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from 'src/database/PrismaService';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [forwardRef(() => AuthModule), UsersModule],
  controllers: [TokenController],
  providers: [TokenService, PrismaService],
  exports: [TokenService]
})
export class TokenModule {}
