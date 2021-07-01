import {BadRequestException, HttpException, HttpStatus, Injectable, Post} from '@nestjs/common';
import {LoginDto} from './dto/login.dto';
import {RegistrationDto} from './dto/registration.dto';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import {User} from '../users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {
  }

  async login(userDto: LoginDto) {
    const user = await this.validateUser(userDto);
    return await this.generateToken(user);
  }

  async registration(userDto: RegistrationDto) {
    const candidate = await this.usersService.getByEmail(userDto.email);
    if (candidate) {
      throw new BadRequestException('Пользователь с таким email уже существует!');
    }

    const hash = await bcrypt.hash(userDto.password, 12);
    await this.usersService.registration({...userDto, password: hash});
    return new HttpException({message: 'Вы успешно зарегистрировались!'}, HttpStatus.OK);
  }

  async generateToken(user: User) {
    const payload = {id: user.id, email: user.email, role: user.role};
    return {
      token: this.jwtService.sign(payload)
    };
  }

  private async validateUser(userDto: LoginDto): Promise<User> {
    const user = await this.usersService.getByEmail(userDto.email);
    const passwordEqual = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEqual) {
      return user;
    }
    throw new BadRequestException('Некорректный email или пароль!');
  }
}
