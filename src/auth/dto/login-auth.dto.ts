import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'user1@mail.uz',
    description: 'Foydalanuvchi elektron pochtasi',
  })
  @IsEmail({}, { message: 'Email xato kiritilgan' })
  @IsNotEmpty({ message: "Bo'sh bo'lmasligi kerak" })
  readonly email: string;

  @ApiProperty({ example: '12345', description: 'Foydalanuvchi paroli' })
  @IsString({ message: "string bo'lishi kerak" })
  @MinLength(4, { message: "Parol 4 ta belgidan uzun bo'lishi kerak" })
  @IsNotEmpty({ message: "Bo'sh bo'lmasligi kerak" })
  readonly password: string;
}
