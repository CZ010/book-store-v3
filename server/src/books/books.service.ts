import {BadRequestException, Injectable} from '@nestjs/common';
import {Book} from './book.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {FileService} from '../file/file.service';
import {CreateBookDto} from './dto/createBook.dto';

@Injectable()
export class BooksService {

  constructor(@InjectRepository(Book) private booksRepository: Repository<Book>,
              private fileService: FileService) {
  }

  async create(file: Express.Multer.File, book: CreateBookDto): Promise<Book> {
    const imagePath = await this.fileService.create(file);
    return await this.booksRepository.save(new Book({
      title: book.title,
      author: book.author,
      description: book.description,
      quantity: book.quantity,
      price: book.price,
      categoryId: book.categoryId,
      image: imagePath
    }));
  }

  async getAll(): Promise<Book[]> {
    return await this.booksRepository.find({relations: ['category'], order: {id: 'DESC'}});
  }

  async getById(id): Promise<Book> {
    const book = await this.booksRepository.findOne(id, {relations: ['category']});
    if (!book) {
      throw new BadRequestException('Такой книги не существует');
    }
    return book;
  }

  async update(bookId: number, payload) {
    return this.booksRepository.update(bookId, payload);
  }
}
