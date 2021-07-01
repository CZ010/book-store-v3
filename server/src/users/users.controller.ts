import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put, UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/createUser.dto';
import {User} from './user.entity';
import {UpdateUserDto} from './dto/updateUser.dto';
import {UpdateResult} from 'typeorm';
import {Roles} from '../auth/rolesAuth.decorator';
import {RolesGuard} from '../auth/roles.guard';

@Controller('api/users')
export class UsersController {

  constructor(private usersService: UsersService) {
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return await this.usersService.create(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getUserById(@Param('id') id): Promise<User> {
    return this.usersService.getById(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id, @Body() user: UpdateUserDto): Promise<UpdateResult> {
    return await this.usersService.update(id, user);
  }
}
