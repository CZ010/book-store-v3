import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Cart} from './cart.entity';
import {CreateCartDto} from './dto/createCart.dto';
import {Book} from '../books/book.entity';
import {CartItem} from './cartItem.entity';

@Injectable()
export class CartsService {

  constructor(@InjectRepository(Cart) private cartRepository: Repository<Cart>,
              @InjectRepository(Book) private booksRepository: Repository<Book>) {
  }

  async create(cart: CreateCartDto): Promise<Cart> {
    return await this.cartRepository.save(cart);
  }

  async addBook(userId, bookId): Promise<Cart> {
    const cart = await this.cartRepository.findOne({userId: userId}, {relations: ['books', 'books.category']});
    if (!cart) {
      throw new BadRequestException('Ошибка при добавлении книги в корзину');
    }
    const book = await this.booksRepository.findOne(bookId, {relations: ['category']});
    if (!book) {
      throw new BadRequestException('Ошибка при добавлении книги в корзину');
    }
    cart.books.push(book);
    return await this.cartRepository.save(cart);
  }

  async getById(userId: number): Promise<any> {
    const cart = await this.cartRepository.findOne({userId: userId}, {relations: ['books']});
    if (!cart) {
      throw new BadRequestException();
    }
    return cart;
  }

  async deleteItem(userId, bookId) {
    const cart = await this.cartRepository.findOne({userId: userId}, {relations: ['books', 'books.category']});
    if (!cart) {
      throw new BadRequestException('Ошибка при добавлении книги в корзину');
    }
    const bookToRemove = await this.booksRepository.findOne(bookId, {relations: ['category']});
    if (!bookToRemove) {
      throw new BadRequestException('Ошибка при добавлении книги в корзину');
    }
    cart.books = cart.books.filter(book => book.id !== bookToRemove.id);
    return await this.cartRepository.save(cart);
  }
}
