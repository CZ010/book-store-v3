import {Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseInterceptors} from '@nestjs/common';
import {CreateCategoryDto} from './dto/createCategory.dto';
import {Category} from './category.entity';
import {CategoriesService} from './categories.service';

@Controller('api/categories')
export class CategoriesController {

  constructor(private categoryService: CategoriesService) {
  }

  @Post()
  async createCategories(@Body() category: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(category);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getCategoriesById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.getById(id);
  }
}
