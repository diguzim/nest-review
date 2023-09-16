import { User } from '../../domain/user/user.entity';
import { IUserRepository } from '../../domain/user/user.repository';

type CreateUserInput = {
  name: string;
  email: string;
  password_hash: string;
};

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(input: CreateUserInput) {
    const user = User.create(input);
    await this.userRepository.insert(user);
    return user;
  }
}
