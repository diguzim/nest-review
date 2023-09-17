import { IUserRepository } from '../../domain/user/user.repository';

export class GetOneUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: number) {
    const user = await this.userRepository.findOne(id);
    return user;
  }
}
