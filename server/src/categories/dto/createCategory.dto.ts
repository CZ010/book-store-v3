import {IsNotEmpty} from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({message: 'Название категрогии не должно быть пустым!'})
  readonly title: string;
}