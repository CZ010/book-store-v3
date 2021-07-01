import {Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors} from '@nestjs/common';
import {OrdersService} from './orders.service';
import {CreateOrderDto} from './dto/CreateOrder.dto';

@Controller('api/orders')
export class OrdersController {

  constructor(private ordersService: OrdersService) {
  }

  @Post()
  async createOrder(@Body() order: CreateOrderDto) {
    return this.ordersService.create(order);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAllBooks() {
    return await this.ordersService.getAll();
  }
}
