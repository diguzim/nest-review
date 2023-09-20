import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Patch,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Public } from '../decorators';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetAllUsersUseCase,
  GetOneUserUseCase,
  UpdateUserUseCase,
} from '../@core/application/user';
import {
  UserSerialized,
  UserSerializer,
} from '../common/serializers/user.serializer';

@Controller('users')
export class UsersController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getAllUsersUseCase: GetAllUsersUseCase,
    private getOneUserUseCase: GetOneUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  @Public()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserSerialized> {
    const user = await this.createUserUseCase.execute(createUserDto);
    return UserSerializer.serialize(user);
  }

  @Get()
  @Public()
  async findAll(): Promise<UserSerialized[]> {
    const users = await this.getAllUsersUseCase.execute();
    return users.map((user) => UserSerializer.serialize(user));
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.getOneUserUseCase.execute(id);

    if (!user) {
      throw new NotFoundException();
    }

    return UserSerializer.serialize(user);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.updateUserUseCase.execute({
      id: id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException();
    }

    return UserSerializer.serialize(user);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const user = await this.deleteUserUseCase.execute(id);

    if (!user) {
      throw new NotFoundException();
    }

    return UserSerializer.serialize(user);
  }
}
