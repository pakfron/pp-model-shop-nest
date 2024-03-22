import { BadRequestException } from '@nestjs/common';
import {
  Equals,
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(15)
  username: string;
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z]).*$/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @MinLength(4)
  @MaxLength(15)
  password: string;

  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
