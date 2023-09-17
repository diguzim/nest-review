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
    const user = await this.buildUserEntity(input);
    await this.userRepository.update(user);
    return user;
  }

  private async buildUserEntity(input: UpdateUserInput) {
    const user = User.create({
      id: input.id,
      name: input.name,
      email: input.email,
      password_hash: await this.cryptService.hash(input.password),
    });

    return user;
  }
}
