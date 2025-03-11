import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,POST,PATCH,PUT,DELETE',
    credentials: true,
  });
  const port = parseInt(process.env.PORT || '3000', 10);
  await app.listen(port);
}
bootstrap();
