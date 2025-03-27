/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
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
  nom?: string;

  @IsString()
  @IsOptional()
  prenom?: string;

  @IsString()
  @IsOptional()
  profile?: string;

  @IsEnum(['admin', 'editeur', 'auteur'])
  @IsOptional()
  role?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
