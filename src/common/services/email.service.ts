import { IEmailService } from '../../@core/services';

export class EmailService implements IEmailService {
  async sendEmail(email: string, message: string): Promise<void> {
    console.log(`Sending email to ${email} with message: ${message}`);
  }
}
