import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { ActivateUsersDto } from './dto/activate-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUsersDto } from './dto/create-user.dto';
import { UpdateUsersDto } from './dto/update-user.dto';
import { User } from './users.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private readonly roleService: RolesService,
  ) {}

  async createUser(createUserDto: CreateUsersDto) {
    const newUser = await this.userRepository.create(createUserDto);
    // const role = await this.roleService.getRoleByValue('ADMIN');
    const role = await this.roleService.getRoleByValue('USER');
    await newUser.$set('roles', [role.id]);
    newUser.roles = [role];
    return newUser;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepository.findByPk(addRoleDto.user_id);
    const role = await this.roleService.getRoleByValue(addRoleDto.value);
    if (role && user) {
      await user.$add('role', role.id);
      return addRoleDto;
    }
    throw new HttpException(
      'Foydalanuvchi yoki rol topilmadi',
      HttpStatus.NOT_FOUND,
    );
  }
  async activateUser(activateUserDto: ActivateUsersDto) {
    const user = await this.userRepository.findByPk(activateUserDto.userId);
    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }
    user.is_active = true;
    await user.save();
    return user;
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      console.log(user);
      throw new HttpException('Foydalunvchi topilmadi', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.destroy({ where: { id } });
    return user;
  }

  async updateUser(updateUserDto: UpdateUsersDto, id: number) {
    try {
      const user = await this.userRepository.findByPk(id);
      if (!user) {
        throw new HttpException('Foydalunvchi topilmadi', HttpStatus.NOT_FOUND);
      }
      if (updateUserDto.email) {
        const userEmail = await this.userRepository.findOne({
          where: { email: updateUserDto.email },
        });
        if (userEmail && userEmail.id != id) {
          throw new HttpException(
            'Bunday foydalanuvchi mavjud',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      user.name = updateUserDto.name || user.name;
      user.email = updateUserDto.email || user.email;
      user.password = updateUserDto.password
        ? bcrypt.hashSync(updateUserDto.password, 7)
        : user.password;
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException({
        message: error.message,
      });
    }
  }

  async getOneUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return user;
  }
}
