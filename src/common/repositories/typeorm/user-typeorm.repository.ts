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

  async findOne(id: number): Promise<User | null> {
    return await this.ormRepository.findOneBy({ id: id });
  }

  async update(user: User): Promise<void> {
    await this.ormRepository.update(user.id as number, user);
  }
}
