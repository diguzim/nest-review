import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.buildUserEntity(createUserDto);
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      return null;
    }

    this.updateUserEntity(user, updateUserDto);

    await this.usersRepository.save(user);

    return user;
  }

  async delete(id: number) {
    return await this.usersRepository.delete(id);
  }

  private buildUserEntity(userDto: CreateUserDto): User {
    const user = new User();
    user.name = userDto.name;
    user.email = userDto.email;
    user.password = userDto.password;
    return user;
  }

  private updateUserEntity(user: User, userDto: UpdateUserDto) {
    user.name = userDto.name;
    user.email = userDto.email;
    user.password = userDto.password;
  }
}
