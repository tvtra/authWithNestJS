import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AbilityFactory, Action } from 'src/ability/ability.factory';
import { User } from 'src/users/schemas/user.schema';
import { Book } from './schemas/book.schema';
import { Request } from 'express';
import { ForbiddenError } from '@casl/ability';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private abilityFactory: AbilityFactory) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Req() req,
    @Body() createBookDto: CreateBookDto) {
    const user = req.user;
    return this.booksService.create(createBookDto, user);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() req) {
    const user = req.user;
    return this.booksService.findAll(user);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    const user = req.user;
    return this.booksService.findOne(id, user);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Req() req, 
    @Param('id') id: string, 
    @Body() updateBookDto: UpdateBookDto) {
    const user = req.user;
    return this.booksService.update(id, updateBookDto, user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    const user = req.user;
    return this.booksService.remove(id, user);
  }
}
