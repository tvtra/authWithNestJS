import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { Model } from 'mongoose';
import { AbilityFactory, Action } from 'src/ability/ability.factory';
import { User } from 'src/users/schemas/user.schema';
import { ForbiddenError } from '@casl/ability';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    private abilityFactory: AbilityFactory) {}

  async create(createBookDto: CreateBookDto, currentUser: User): Promise<Book> {
    const ability = this.abilityFactory.defineAbility(currentUser);

    try {
      ForbiddenError.from(ability)
      .throwUnlessCan(Action.Create, Book);

    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }

    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save()
  }

  async findAll(currentUser: User): Promise<Book[]> {
    const ability = this.abilityFactory.defineAbility(currentUser);
    
    try {
      ForbiddenError.from(ability)
      .throwUnlessCan(Action.Read, Book);
      return this.bookModel.find().exec();
    } catch (error) {
      if (error) {
        if (error instanceof ForbiddenError) {
          throw new ForbiddenException(error.message);
        }
      }
    }
  }

  findOne(id: string, currentUser: User) {
    const ability = this.abilityFactory.defineAbility(currentUser);
    
    try {
      ForbiddenError.from(ability)
      .throwUnlessCan(Action.Read, Book);
       
      return this.bookModel.findById(id).exec();
    } catch (error) {
      if (error) {
        if (error instanceof ForbiddenError) {
          throw new ForbiddenException(error.message);
        }
      }
    }
  }

  async update(id: string, updateBookDto: UpdateBookDto, currentUser: User) {
    const ability = this.abilityFactory.defineAbility(currentUser);

    try {
      const bookToUpdate = await this.findOne(id, currentUser);

      ForbiddenError.from(ability)
      .throwUnlessCan(Action.Update, await bookToUpdate);

    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
    return this.bookModel.findByIdAndUpdate(id, updateBookDto);
  }

  async remove(id: string, currentUser: User) {
    const ability = this.abilityFactory.defineAbility(currentUser);

    try {
      ForbiddenError.from(ability)
      .throwUnlessCan(Action.Delete, Book);

    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
    return this.bookModel.findByIdAndDelete(id);
  }
}
