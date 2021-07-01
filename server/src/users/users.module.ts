import {forwardRef, Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './user.entity';
import {CartsModule} from '../carts/carts.module';
import {CartsService} from '../carts/carts.service';
import {Book} from '../books/book.entity';
import {Cart} from '../carts/cart.entity';
import {AuthModule} from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CartsModule,
    forwardRef(() => AuthModule)
  ],
  controllers: [UsersController],
  providers: [UsersService, TypeOrmModule],
  exports: [UsersService]
})
export class UsersModule {
}
