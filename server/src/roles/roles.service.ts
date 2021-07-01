import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Role} from './role.entity';

@Injectable()
export class RolesService {

  constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {
  }

  // async create(role: CreateRoleDto): Promise<Role> {
  //   return await this.roleRepository.save(role);
  // }

  async getAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }
}
