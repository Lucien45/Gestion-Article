/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  usrname: string;

  @IsString()
  @IsOptional()
  profile?: string;

  @IsEnum(['admin', 'editeur', 'auteur'])
  @IsOptional()
  role?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
