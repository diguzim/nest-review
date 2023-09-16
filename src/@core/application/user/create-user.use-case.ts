import { User } from '../../domain/user/user.entity';
import { IUserRepository } from '../../domain/user/user.repository';
import { IEmailService } from '../../services/email.service';

type CreateUserInput = {
  name: string;
  email: string;
  password_hash: string;
};

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private emailNotification: IEmailService,
  ) {}

  async execute(input: CreateUserInput) {
    const user = User.create(input);
    await this.userRepository.insert(user);
    await this.emailNotification.sendEmail(user.email, 'Welcome to the app!');
    return user;
  }
}
