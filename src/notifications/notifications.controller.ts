import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class NotificationsController {
  @EventPattern('send_welcome_email')
  async sendWelcomeEmail(data: Record<string, unknown>) {
    console.log('sendWelcomeEmail data', data);
  }
}
