import { IUserRepository } from '../../domain/user/user.repository';

export class GetAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute() {
    const users = await this.userRepository.findAll();
    return users;
  }
}
