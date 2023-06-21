import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { BooksModule } from './modeles/books/books.module';

@Module({
  imports: [TasksModule, BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
