import { PartialType } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCommentaireDto {
  @IsNotEmpty()
  @IsString()
  contenu: string;

  @IsOptional()
  @IsNumber()
  user_id: number;

  @IsOptional()
  @IsNumber()
  article_id: number;

  @IsEnum(['approuve', 'en attente', 'rejete'])
  @IsNotEmpty()
  status: string;
}

export class UpdateCommenatireDto extends PartialType(CreateCommentaireDto) {}
