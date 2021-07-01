import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  readonly quantity: number;

  @IsNotEmpty()
  readonly price: number;

  @IsNotEmpty()
  readonly categoryId: number;
}