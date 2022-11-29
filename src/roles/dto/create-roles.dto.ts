import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRolesDto {
  @ApiProperty({ example: 'ADMIN', description: 'Foydalanuvchi ro`li' })
  @IsString({ message: "Ismi string bo'lishi kerak" })
  @IsNotEmpty({ message: "Bo'sh bo'lmasligi kerak" })
  readonly value: string;

  @ApiProperty({
    example: 'Administrator',
    description: 'Foydalanuvchi ro`li haqida ma`lumot',
  })
  @IsString({ message: "Ismi string bo'lishi kerak" })
  @IsNotEmpty({ message: "Bo'sh bo'lmasligi kerak" })
  readonly description: string;
}
