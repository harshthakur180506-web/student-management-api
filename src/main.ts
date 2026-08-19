import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception/http-exception.filter';
import { LoggingInterceptor } from './common/logging/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
    urls: ['amqp://harsh:Harsh123@localhost:5672'],
      queue: 'email_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new LoggingInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Student Management API')
    .setDescription('Student Management API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 3000);

  console.log('HTTP Server Running');
  console.log('RabbitMQ Microservice Running');
}

bootstrap();