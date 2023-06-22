import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { BooksModule } from './modules/books/books.module';
import { AuthModule } from './modules/auth/auth.module';
import { TokenModule } from './modules/token/token.module';


@Module({
  imports: [TasksModule, BooksModule, AuthModule, TokenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
