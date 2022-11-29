import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRolesDto } from './dto/create-roles.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(createRoleDto: CreateRolesDto) {
    const newRole = await this.roleRepository.create(createRoleDto);
    return newRole;
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  }

  async getAllRoles() {
    const roles = await this.roleRepository.findAll({ include: { all: true } });
    return roles;
  }
}
