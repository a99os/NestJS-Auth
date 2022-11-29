import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRolesDto } from './dto/create-roles.dto';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@ApiTags('Rollar')
@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @ApiOperation({ summary: 'Role yaratish' })
  @ApiResponse({ status: 201, type: Role })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createRolesDto: CreateRolesDto) {
    return this.roleService.createRole(createRolesDto);
  }

  @ApiOperation({ summary: 'Rollarni olish' })
  @ApiResponse({ status: 201, type: [Role] })
  @Get()
  getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @ApiOperation({ summary: 'Role bo`yicha olish' })
  @ApiResponse({ status: 201, type: Role })
  @Get(':value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
