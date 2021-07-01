import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';
import {User} from '../users/user.entity';
import {OrderItem} from './orderItem.entity';
import {Exclude} from 'class-transformer';

@Entity({name: 'orders'})
export class Order {

  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({name: 'user_id'})
  userId: number;

  @Column({default: true})
  status: boolean;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({name: 'user_id'})
  user: User;

  @OneToMany(() => OrderItem, items => items.order)
  @JoinTable({name: 'order_items'})
  items: OrderItem[];

  constructor(partial: Partial<Order>) {
    Object.assign(this, partial);
  }

  @CreateDateColumn({name: 'created_date'})
  createdDate;

  @UpdateDateColumn({name: 'updated_date'})
  updatedDate;
}