import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Foydalanuvchi Ro`li' })
  @IsString({ message: "Ismi string bo'lishi kerak" })
  @IsNotEmpty({ message: "Bo'sh bo'lmasligi kerak" })
  readonly value: string;

  @ApiProperty({ example: 1, description: 'Foydalanuvchi id raqami' })
  @IsNumber({}, { message: "ID number bo'lishi kerak" })
  @IsNotEmpty({ message: "Bo'sh bo'lmasligi kerak" })
  readonly user_id: number;
}
