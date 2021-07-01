import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Order} from './order.entity';
import {Repository} from 'typeorm';
import {CreateOrderDto} from './dto/CreateOrder.dto';
import {OrderItem} from './orderItem.entity';
import {Book} from '../books/book.entity';
import {BooksService} from '../books/books.service';

@Injectable()
export class OrdersService {

  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>,
              @InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>,
              private booksService: BooksService) {
  }

  async create(dto: CreateOrderDto) {
    const order = await this.orderRepository.save({userId: dto.userId});
    for (const item of dto.items) {
      await this.orderItemRepository.save({orderId: order.id, bookId: item.bookId, count: item.count});
      const book = await this.booksService.getById(item.bookId);
      await this.booksService.update(book.id, {quantity: book.quantity - item.count});
    }
    return await this.orderRepository.findOne(order.id, {relations: ['user', 'items', 'items.book', 'user.role', 'items.book.category']});
  }

  async getAll() {
    return await this.orderRepository.find({relations: ['user', 'items', 'items.book', 'user.role', 'items.book.category']});
  }
}
