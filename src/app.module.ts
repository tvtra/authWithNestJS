import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AbilityModule } from './ability/ability.module';

@Module({
  imports: [
    BooksModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017'),
    AuthModule,
    UsersModule,
    AbilityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
