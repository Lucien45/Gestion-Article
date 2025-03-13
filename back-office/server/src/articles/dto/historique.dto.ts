import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHistoriqueDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  action: string;
}

export class UpdateHistoriqueDto extends PartialType(CreateHistoriqueDto) {}
