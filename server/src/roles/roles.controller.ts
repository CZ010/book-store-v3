import {Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors} from '@nestjs/common';
import {CreateRoleDto} from './dto/createRole.dto';
import {RolesService} from './roles.service';
import {Role} from './role.entity';

@Controller('api/roles')
export class RolesController {

  constructor(private rolesService: RolesService) {
  }

  // @Post()
  // async createRole(@Body() role: CreateRoleDto): Promise<Role> {
  //   return await this.rolesService.create(role);
  // }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAllRoles(): Promise<Role[]> {
    return this.rolesService.getAll();
  }
}
