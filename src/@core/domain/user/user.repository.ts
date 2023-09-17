import { User } from './user.entity';

export interface IUserRepository {
  insert(user: User): Promise<void>;
  findAll(): Promise<User[]>;
}
