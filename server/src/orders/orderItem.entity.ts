import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {Order} from './order.entity';
import {Book} from '../books/book.entity';
import {Exclude} from 'class-transformer';

@Entity({name: 'order_items'})
export class OrderItem {

  @Exclude()
  @PrimaryColumn({name: 'order_id'})
  orderId: number;

  @Exclude()
  @PrimaryColumn({name: 'book_id'})
  bookId: number;

  @Column()
  count: number;

  @ManyToOne(() => Order, order => order.items)
  @JoinColumn({name: 'order_id'})
  order: Order;

  @ManyToOne(() => Book)
  @JoinColumn({name: 'book_id'})
  book: Book;

  constructor(partial: Partial<Order>) {
    Object.assign(this, partial);
  }
}