import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import {User} from '../users/user.entity';
import {Exclude} from 'class-transformer';


@Entity({name: 'roles'})
export class Role {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  value: string;

  @Column()
  title: string;

  @OneToMany(() => User, user => user.role)
  users: User[];

  @Exclude()
  @CreateDateColumn({name: 'created_date'})
  createdDate;

  @Exclude()
  @UpdateDateColumn({name: 'updated_date'})
  updatedDate;

  constructor(partial: Partial<Role>) {
    Object.assign(this, partial);
  }
}