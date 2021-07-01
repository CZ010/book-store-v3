import {Module} from '@nestjs/common';
import {CartsService} from './carts.service';
import {CartsController} from './carts.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Cart} from './cart.entity';
import {Book} from '../books/book.entity';
import {AuthModule} from '../auth/auth.module';
import {CartItem} from './cartItem.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, Book]),
    AuthModule
  ],
  providers: [CartsService, TypeOrmModule],
  controllers: [CartsController],
  exports: [CartsService]
})
export class CartsModule {
}
