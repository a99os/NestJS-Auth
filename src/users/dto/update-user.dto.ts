import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUsersDto {
  @IsOptional()
  @ApiProperty({ example: 'User1', description: 'Foydalanuvchi ismi' })
  @IsString({ message: "Ismi string bo'lishi kerak" })
  readonly name: string;
  @ApiProperty({
    example: 'user1@mail.uz',
    description: 'Foydalanuvchi elektron pochtasi',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Email xato kiritilgan' })
  readonly email: string;

  @ApiProperty({ example: '12345', description: 'Foydalanuvchi paroli' })
  @IsOptional()
  @IsString({ message: "string bo'lishi kerak" })
  @MinLength(4, { message: "Parol 4 ta belgidan uzun bo'lishi kerak" })
  readonly password: string;
}
