/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  titre: string;

  @IsString()
  @IsOptional()
  contenu?: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  couverture?: string;

  @IsNotEmpty()
  @IsNumber()
  auteur_id: number;

  @IsNotEmpty()
  @IsNumber()
  categorie_id: number;

  @IsEnum(['brouillon', 'publié', 'archivé'])
  @IsNotEmpty()
  status: string;

  @IsOptional()
  @IsNumber()
  reading_time: number;

  @IsOptional()
  @IsBoolean()
  featured: boolean;
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
