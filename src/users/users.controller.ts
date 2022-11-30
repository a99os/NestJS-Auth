import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserSelfGuard } from 'src/guards/user-self.guard';
// import { ValidationPipe } from 'src/pipe/validation.pipe';
import { ActivateUsersDto } from './dto/activate-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUsersDto } from './dto/create-user.dto';
import { UpdateUsersDto } from './dto/update-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Foydalanuvchilar')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Foydalanuvchi yaratish' })
  @ApiResponse({ status: 201, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createUserDto: CreateUsersDto) {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Foydalanuvchi olish' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Foydalanuvchilarga role berish' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Post('role')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.userService.addRole(addRoleDto);
  }

  @ApiOperation({ summary: 'Foydalanuvchini  faollashtirish' })
  @ApiResponse({ status: 201, type: User })
  @UsePipes(ValidationPipe)
  @Post('activate')
  activateUser(@Body() activateUserDto: ActivateUsersDto) {
    return this.userService.activateUser(activateUserDto);
  }

  @ApiOperation({ summary: 'Foydalanuvchini  o`chirish' })
  @ApiResponse({ status: 201, type: User })
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }

  @ApiOperation({ summary: 'Foydalanuvchi ma`lumotlarini yangilash' })
  @ApiResponse({ status: 201, type: User })
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUsersDto) {
    console.log('contr');
    return this.userService.updateUser(updateUserDto, id);
  }

  @ApiOperation({ summary: 'Foydalanuvchini  id bo`yicha olish' })
  @ApiResponse({ status: 201, type: User })
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getOneUser(@Param('id') id: number) {
    return this.userService.getOneUser(id);
  }

  @ApiOperation({ summary: 'Foydalanuvchini  id bo`yicha olish' })
  @ApiResponse({ status: 201, type: User })
  @UseGuards(JwtAuthGuard)
  @Get('admin/:id')
  getOneUserByAdmin(@Param('id') id: number) {
    return this.userService.getOneUser(id);
  }
}
