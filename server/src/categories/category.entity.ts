import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {Exclude} from 'class-transformer';
import {IsEmpty, IsNotEmpty} from 'class-validator';
import {Book} from '../books/book.entity';

@Entity({name: 'categories'})
export class Category {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  title: string;

  @Column({default: true})
  status: boolean;

  @OneToMany(() => Book, books => books.category)
  books: Book[];

  @Exclude()
  @CreateDateColumn({name: 'created_date'})
  createdDate;

  @UpdateDateColumn({name: 'updated_date'})
  updatedDate;

  constructor(partial: Partial<Book>) {
    Object.assign(this, partial);
  }
}