import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentaireDto {
  @IsNotEmpty()
  @IsString()
  contenu: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  user_id: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  article_id: number;

  @IsEnum(['approuve', 'en attente', 'rejete'])
  @IsNotEmpty()
  status: string;
}

export class UpdateCommenatireDto extends PartialType(CreateCommentaireDto) {}
