import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetAllUsersUseCase,
  GetOneUserUseCase,
  UpdateUserUseCase,
} from '../@core/application/user';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {},
        },
        {
          provide: CreateUserUseCase,
          useValue: {},
        },
        {
          provide: GetAllUsersUseCase,
          useValue: {},
        },
        {
          provide: GetOneUserUseCase,
          useValue: {},
        },
        {
          provide: UpdateUserUseCase,
          useValue: {},
        },
        {
          provide: DeleteUserUseCase,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
