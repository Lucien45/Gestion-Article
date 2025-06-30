import { PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLogDto {
  @IsString()
  @IsNotEmpty()
  action: string;

  @IsNotEmpty()
  @IsNumber()
  user: number;
}

export class UpdateLogDto extends PartialType(CreateLogDto) {}
