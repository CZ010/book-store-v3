import {
  Body,
  ClassSerializerInterceptor,
  Controller, Delete,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {CartsService} from './carts.service';
import {CreateCartDto} from './dto/createCart.dto';
import {Cart} from './cart.entity';
import {JwtAuthGuard} from '../auth/jwtAuth.guard';
import {AuthUser} from '../auth/user.decorator';
import {CartItem} from './cartItem.entity';

@Controller('api/carts')
export class CartsController {

  constructor(private cartsService: CartsService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post('/items')
  async addBookToCart(@Query('book') bookId: string, @AuthUser() authUser: any): Promise<Cart> {
    return await this.cartsService.addBook(authUser.id, bookId);
  }

  @Post()
  async createCart(@Body() cart: CreateCartDto): Promise<Cart> {
    return this.cartsService.create(cart);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getCartById(@AuthUser() authUser: any): Promise<any> {
    return this.cartsService.getById(authUser.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/items')
  async removeBookFromCart(@Query('book') bookId: string, @AuthUser() authUser: any): Promise<any> {
    return await this.cartsService.deleteItem(authUser.id, bookId);
  }
}
