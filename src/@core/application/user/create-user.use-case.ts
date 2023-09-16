import { User } from '../../domain/user/user.entity';
import { IUserRepository } from '../../domain/user/user.repository';
import { IEmailService, ICryptService } from '../../services';

type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private emailNotification: IEmailService,
    private cryptService: ICryptService,
  ) {}

  async execute(input: CreateUserInput) {
    const user = await this.buildUserEntity(input);
    await this.userRepository.insert(user);
    await this.emailNotification.sendEmail(user.email, 'Welcome to the app!');
    return user;
  }

  private async buildUserEntity(input: CreateUserInput) {
    const user = User.create({
      name: input.name,
      email: input.email,
      password_hash: await this.cryptService.hash(input.password),
    });

    return user;
  }
}
