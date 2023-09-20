import { User } from '../../domain/user/user.entity';
import { IUserRepository } from '../../domain/user/user.repository';

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      return null;
    }

    await this.userRepository.delete(id);

    return user;
  }
}
