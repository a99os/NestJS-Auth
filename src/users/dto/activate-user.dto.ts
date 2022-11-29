import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ActivateUsersDto {
  @ApiProperty({ example: 1, description: 'Foydalanuvchi id raqami' })
  @IsNumber({}, { message: "ID number bo'lishi kerak" })
  @IsNotEmpty({ message: "Bo'sh bo'lmasligi kerak" })
  readonly userId: number;
}
