import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import {Book} from './book.entity';
import {BooksService} from './books.service';
import {FileInterceptor} from '@nestjs/platform-express';
import {CreateBookDto} from './dto/createBook.dto';

@Controller('api/books')
export class BooksController {

  constructor(private booksService: BooksService) {
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createBook(@UploadedFile() file: Express.Multer.File, @Body() book: CreateBookDto): Promise<Book> {
    return await this.booksService.create(file, book);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAllBooks(): Promise<Book[]> {
    return await this.booksService.getAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<Book> {
    return await this.booksService.getById(id);
  }
}
