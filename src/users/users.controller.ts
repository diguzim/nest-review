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
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Public } from '../decorators';
import {
  CreateUserUseCase,
  GetAllUsersUseCase,
} from '../@core/application/user';
import {
  UserSerialized,
  UserSerializer,
} from '../common/serializers/user.serializer';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private createUserUseCase: CreateUserUseCase,
    private getAllUsersUseCase: GetAllUsersUseCase,
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
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.update(id, updateUserDto);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.usersService.delete(id);

    if (deleted.affected === 0) {
      throw new NotFoundException();
    }

    return 'Successfully deleted';
  }
}
