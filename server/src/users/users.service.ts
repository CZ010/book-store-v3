import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './user.entity';
import {Repository, UpdateResult} from 'typeorm';
import {CreateUserDto} from './dto/createUser.dto';
import {UpdateUserDto} from './dto/updateUser.dto';
import {RegistrationDto} from '../auth/dto/registration.dto';
import {CartsService} from '../carts/carts.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private usersRepository: Repository<User>,
              private cartsService: CartsService) {
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(userDto.password, 12);
    const user = await this.usersRepository.save({...userDto, password: hash});
    await this.cartsService.create({userId: user.id});
    return user;
  }

  async registration(userDto: RegistrationDto) {
    const user = await this.usersRepository.save(userDto);
    return this.getById(user.id);
  }

  async getAll(): Promise<User[]> {
    return await this.usersRepository.find({relations: ['role']});
  }

  async getById(userId: number): Promise<User> {
    const user = await this.usersRepository.findOne(userId, {relations: ['role']});
    if (!user) {
      throw new BadRequestException();
    }
    return user;
  }

  async update(id: number, user: UpdateUserDto): Promise<UpdateResult> {
    return await this.usersRepository.update(id, user);
  }

  async getByEmail(email: string) {
    return this.usersRepository.findOne({email: email}, {relations: ['role']});
  }
}
