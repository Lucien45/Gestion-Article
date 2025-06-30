import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from './entities/log.entity';
import { Repository } from 'typeorm';
import { CreateLogDto } from './dto/log.dto';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
  ) {}

  async createLog(dto: CreateLogDto): Promise<Log> {
    const log = this.logRepository.create({
      ...dto,
      user: { id: dto.user },
    });
    return this.logRepository.save(log);
  }

  async findAll(): Promise<Log[]> {
    return this.logRepository.find({
      order: { date: 'DESC' },
      relations: ['user'],
    });
  }

  async findOne(LogId: number): Promise<Log> {
    const log = await this.logRepository.findOne({
      where: { id: LogId },
      relations: ['user'],
    });
    if (!log) throw new NotFoundException('log non trouvé');
    return log;
  }

  async remove(id: number): Promise<void> {
    await this.logRepository.delete(id);
  }
}
