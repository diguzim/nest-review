import { Repository } from 'typeorm';
import { IUserRepository } from '../../../@core/domain/user/user.repository';
import { User } from '../../../@core/domain/user/user.entity';

export class UserTypeOrmRepository implements IUserRepository {
  constructor(private ormRepository: Repository<User>) {}

  async insert(user: User): Promise<void> {
    await this.ormRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.ormRepository.find();
  }
}
