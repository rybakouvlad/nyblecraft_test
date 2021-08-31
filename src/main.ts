import 'dotenv/config';
import { join } from 'path';
import * as yaml from 'yamljs';
import { SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const swaggerDocument = yaml.load(join(__dirname, '..', 'doc', 'api.yaml'));
  SwaggerModule.setup('doc', app, swaggerDocument);
  await app.listen(process.env.PORT ?? 4000, () =>
    Logger.log(
      `App is running on http://localhost:${process.env.PORT ?? 4000}`,
      'Server',
    ),
  );
}
bootstrap();
