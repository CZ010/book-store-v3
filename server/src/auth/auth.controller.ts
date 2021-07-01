import {Body, Controller, Get, HttpException, Post, Res, UseGuards} from '@nestjs/common';
import {LoginDto} from './dto/login.dto';
import {AuthService} from './auth.service';
import {RegistrationDto} from './dto/registration.dto';
import {Roles} from './rolesAuth.decorator';
import {RolesGuard} from './roles.guard';
import {AuthUser} from './user.decorator';
import {JwtAuthGuard} from './jwtAuth.guard';

@Controller('api/auth')
export class AuthController {

  constructor(
    private authService: AuthService
  ) {
  }

  @Post('/login')
  async login(@Body() user: LoginDto) {
    return await this.authService.login(user);
  }

  @Post('/registration')
  async registration(@Body() user: RegistrationDto): Promise<HttpException> {
    return await this.authService.registration(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async test(@AuthUser() authUser: any) {
    return authUser;
  }
}
