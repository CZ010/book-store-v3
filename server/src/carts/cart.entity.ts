import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn, JoinTable, ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';
import {User} from '../users/user.entity';
import {Book} from '../books/book.entity';
import {Exclude} from 'class-transformer';
import {CartItem} from './cartItem.entity';

@Entity({name: 'carts'})
export class Cart {

  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({name: 'user_id'})
  userId: number;

  @OneToOne(() => User, user => user.cart, {cascade: true})
  @JoinColumn({name: 'user_id'})
  user: User;

  @ManyToMany(() => Book)
  @JoinTable({
    name: 'cart_items',
    joinColumn: {
      name: 'cart_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'book_id',
      referencedColumnName: 'id'
    }
  })
  books: Book[];

  @CreateDateColumn({name: 'created_date'})
  @Exclude()
  createdDate;

  @UpdateDateColumn({name: 'updated_date'})
  @Exclude()
  updatedDate;
}