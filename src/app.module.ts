import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { StudentsModule } from './students/students.module';
import { BranchesModule } from './branches/branches.module';
import { AuthModule } from './auth/auth.module';

import { LoggerMiddleware } from './common/logger/logger.middleware';
import { RabbitmqConsumer } from './rabbitmq/rabbitmq.consumer';

@Module({ 
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),

    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'email_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),

    StudentsModule,
    BranchesModule,
    AuthModule,
  ],

  controllers: [RabbitmqConsumer],

  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}