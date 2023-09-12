import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schema';
import { AbilityModule } from 'src/ability/ability.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
       name: Book.name, schema: BookSchema 
      }]),
    AbilityModule,
    UsersModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
