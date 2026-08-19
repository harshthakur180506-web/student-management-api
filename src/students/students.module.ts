import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { Student } from './entities/student.entity';
import { Branch } from '../branches/entities/branch.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Branch]),

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
  ],

  controllers: [StudentsController],

  providers: [StudentsService],
})
export class StudentsModule {}