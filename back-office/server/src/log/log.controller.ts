import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/log.dto';
import { JwtAuthGuard } from 'src/users/auth.guard';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post()
  create(@Body() dto: CreateLogDto) {
    return this.logService.createLog(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.logService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.logService.findOne(Number(id));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.logService.remove(Number(id));
  }
}
