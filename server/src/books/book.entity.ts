import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import {Category} from '../categories/category.entity';
import {Exclude, Transform} from 'class-transformer';
import {Cart} from '../carts/cart.entity';
import {CartItem} from '../carts/cartItem.entity';

@Entity({name: 'books'})
export class Book {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({type: 'text'})
  description: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  image: string;

  @Column({default: true})
  status: boolean;

  @Exclude()
  @Column({name: 'category_id'})
  categoryId: number;

  @Transform(({value}) => new Category({id: value.id, title: value.title}))
  @ManyToOne(() => Category, category => category.books)
  @JoinColumn({name: 'category_id'})
  category: Category;

  @CreateDateColumn({name: 'created_date'})
  createdDate;

  @UpdateDateColumn({name: 'updated_date'})
  updatedDate;

  constructor(partial: Partial<Book>) {
    Object.assign(this, partial);
  }
}