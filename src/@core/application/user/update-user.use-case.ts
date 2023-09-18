import { User } from '../../domain/user/user.entity';
import { IUserRepository } from '../../domain/user/user.repository';
import { ICryptService } from '../../services';

type UpdateUserInput = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export class UpdateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private cryptService: ICryptService,
  ) {}

  async execute(input: UpdateUserInput) {
    const user = await this.userRepository.findOne(input.id);

    if (!user) {
      return null;
    }

    this.updateUserEntity(user, input);
    await this.userRepository.update(user);
    return user;
  }

  private async updateUserEntity(user: User, input: UpdateUserInput) {
    user.name = input.name;
    user.email = input.email;
    user.password_hash = await this.cryptService.hash(input.password);
  }
}
