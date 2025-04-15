import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello !Welcome to Gestion Article Admin API!🔐';
  }
}
