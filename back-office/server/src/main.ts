import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/media', express.static(join(__dirname, '..', 'media')));

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,POST,PATCH,PUT,DELETE',
    credentials: true,
  });

  const port = parseInt(process.env.PORT || '3000', 10);
  await app.listen(port);
}
bootstrap();
