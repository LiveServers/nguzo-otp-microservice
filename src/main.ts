import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import {config} from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
    const microserviceTCP = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host:"127.0.0.1",
      port: parseInt(configService.get("SERVER_PORT_TCP"),10),
    },
  });
  const url = configService.get("SERVER_PORT");
  const port = configService.get("PORT");
  const microserviceRMQ = await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [url],
      queue: configService.get("QUEUE_NAME"),
      queueOptions: {
        durable: false,
      },
    },
  });
  config.update({
    accessKeyId: configService.get("AWS_ACCESS_KEY_ID"),
    secretAccessKey: configService.get("AWS_SECRET_KEY"),
    region: configService.get("AWS_REGION"),
    apiVersion: configService.get("API_VERSION"),
  });
  await app.startAllMicroservices();
  await app.listen(`0.0.0.0:${port}`);
  logger.log(`Auth service running on http:localhost:${port}`);
}
bootstrap();
