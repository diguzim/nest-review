import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User__OLD } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User__OLD)
    private usersRepository: Repository<User__OLD>,
    @Inject('NOTIFICATIONS_SERVICE')
    private notificationsClient: ClientProxy,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User__OLD> {
    const user = await this.buildUserEntity(createUserDto);
    const result = await this.usersRepository.save(user);

    this.notificationsClient.emit('send_welcome_email', {
      name: user.name,
      email: user.email,
    });

    return result;
  }

  findAll(): Promise<User__OLD[]> {
    return this.usersRepository.find();
  }

  findAllWithRelations(): Promise<User__OLD[]> {
    return this.usersRepository.find({
      relations: ['creatures', 'items'],
    });
  }

  findOne(id: number): Promise<User__OLD | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneBy(options: any): Promise<User__OLD | null> {
    return this.usersRepository.findOneBy(options);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User__OLD | null> {
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
    const user = new User__OLD();
    user.name = userDto.name;
    user.email = userDto.email;
    user.password_hash = await this.hashPassword(userDto.password);
    return user;
  }

  private async updateUserEntity(user: User__OLD, userDto: UpdateUserDto) {
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
