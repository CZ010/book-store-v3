import {CreateOrderItemDto} from './CreateOrderItem.dto';

export class CreateOrderDto {
  readonly userId: number;
  items: CreateOrderItemDto[];
}