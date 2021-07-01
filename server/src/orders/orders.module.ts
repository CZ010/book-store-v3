import {Module} from '@nestjs/common';
import {OrdersController} from './orders.controller';
import {OrdersService} from './orders.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Order} from './order.entity';
import {OrderItem} from './orderItem.entity';
import {BooksModule} from '../books/books.module';
import {BooksService} from '../books/books.service';
import {Book} from '../books/book.entity';
import {FileModule} from '../file/file.module';
import {FileService} from '../file/file.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Book]),
    BooksModule,
    FileModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService, BooksService, FileService]
})
export class OrdersModule {
}
