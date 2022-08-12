import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({
  path: path.join(__dirname, '..', 'config', `${process.env.NODE_ENV}.env`),
});

import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: process.env.GRPC_URL,
        package: 'user',
        protoPath: path.join(__dirname, 'proto/user.proto'),
      },
    },
  );
  await app.listen();
}
bootstrap();
