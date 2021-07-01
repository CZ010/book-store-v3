import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateCategoryDto} from './dto/createCategory.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Category} from './category.entity';
import {Repository} from 'typeorm';

@Injectable()
export class CategoriesService {

  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {
  }

  async create(category: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepository.save(category);
  }

  async getAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async getById(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new BadRequestException('Такой категории не существует');
    }
    return category;
  }
}