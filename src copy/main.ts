import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Partitioners } from 'kafkajs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      subscribe: {
        fromBeginning: true,
      },
      producer: {
        createPartitioner: Partitioners.LegacyPartitioner,
      },
      client: {
        clientId: 'app',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'app-consumer',
      },
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Yape')
    .setDescription('The yape API description')
    .setVersion('1.0')
    .addTag('yape')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.startAllMicroservices();
  app.listen(3000);
}
bootstrap();
