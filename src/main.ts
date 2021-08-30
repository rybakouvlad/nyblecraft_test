import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 4000, () =>
    Logger.log(
      `App is running on http://localhost:${process.env.PORT ?? 4000}`,
      'Server',
    ),
  );
}
bootstrap();
