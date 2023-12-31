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

  async findOneBy(params: Partial<User>): Promise<User | null> {
    return await this.ormRepository.findOneBy(params);
  }

  async update(user: User): Promise<void> {
    await this.ormRepository.update(user.id as number, {
      name: user.name,
      email: user.email,
      password_hash: user.password_hash,
    });
  }

  async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
