import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
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

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.buildUserEntity(createUserDto);
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneBy(options: any): Promise<User | null> {
    return this.usersRepository.findOneBy(options);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    let user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      return null;
    }

    await this.updateUserEntity(user, updateUserDto);

    user = await this.usersRepository.save(user);

    return user;
  }

  delete(id: number) {
    return this.usersRepository.delete(id);
  }

  private async buildUserEntity(userDto: CreateUserDto) {
    const user = new User();
    user.name = userDto.name;
    user.email = userDto.email;
    user.password_hash = await this.hashPassword(userDto.password);
    return user;
  }

  private async updateUserEntity(user: User, userDto: UpdateUserDto) {
    user.name = userDto.name;
    user.email = userDto.email;
    user.password_hash = await this.hashPassword(userDto.password);
  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();

    const hash = await bcrypt.hash(password, salt);

    return hash;
  }
}
