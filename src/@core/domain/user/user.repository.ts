import { User } from './user.entity';

export interface IUserRepository {
  insert(user: User): Promise<void>;
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User | null>;
  findOneBy(params: Partial<User>): Promise<User | null>;
  update(user: User): Promise<void>;
  delete(id: number): Promise<void>;
}
