import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class RabbitmqConsumer {
  @EventPattern('STUDENT_CREATED')
async handleStudentCreated(@Payload() data: any) {

  console.log("📨 Email Service Started");
  console.log(data);

  await new Promise(resolve => setTimeout(resolve, 10000));

  console.log("✅ Email Sent");
}}