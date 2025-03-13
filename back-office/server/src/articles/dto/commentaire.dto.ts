import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentaireDto {
  @IsString()
  @IsNotEmpty()
  contenu: string;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  article_id: number;

  @IsEnum(['approuve', 'en attente', 'rejete'])
  @IsNotEmpty()
  status: string;
}

export class UpdateCommenatireDto extends PartialType(CreateCommentaireDto) {}
