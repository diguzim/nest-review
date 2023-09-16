export interface IEmailService {
  sendEmail(email: string, message: string): Promise<void>;
}
