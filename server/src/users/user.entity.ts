import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany, OneToOne,
  PrimaryGeneratedColumn, Unique,
  UpdateDateColumn
} from 'typeorm';
import {Role} from '../roles/role.entity';
import {Exclude, Transform} from 'class-transformer';
import {Cart} from '../carts/cart.entity';
import {Order} from '../orders/order.entity';

@Entity({name: 'users'})
@Unique(['email'])
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({default: true})
  status: boolean;

  @Exclude()
  @Column({name: 'role_id', default: 4})
  roleId: number;

  // @Transform(({value}) => new Role({id: value.id, value: value.value, title: value.title}))
  @ManyToOne(() => Role, role => role.users)
  @JoinColumn({name: 'role_id'})
  role: Role;

  @OneToOne(() => Cart, cart => cart.user)
  cart: Cart;

  @OneToMany(() => Order, orders => orders.user)
  orders: Order[];

  @CreateDateColumn({name: 'created_date'})
  createdDate: Date;

  @UpdateDateColumn({name: 'updated_date'})
  updatedDate: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}