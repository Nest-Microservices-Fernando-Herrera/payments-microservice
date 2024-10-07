import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('PaymentsMS-Main');

  const app = await NestFactory.create(AppModule);

  // Configuración global de los pipes
  app.useGlobalPipes(
    new ValidationPipe({
      // Validando el uso de los DTOs
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(envs.port);

  logger.log(`Payments Microservice running on port ${envs.port}`);
}
bootstrap();
