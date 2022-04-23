import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

dotenv.config();
const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
    const microserviceTCP = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host:"127.0.0.1",
      port: parseInt(process.env.SERVER_PORT_TCP,10),
    },
  });
  const microserviceRMQ = await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.SERVER_PORT],
      queue: process.env.QUEUE_NAME,
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.PORT);
  logger.log(`Auth service running on http:localhost:${process.env.PORT}`);
}
bootstrap();
