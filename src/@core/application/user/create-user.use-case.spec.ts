import { IUserRepository } from '../../domain/user/user.repository';
import { CreateUserUseCase } from './create-user.use-case';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: IUserRepository;

  beforeEach(() => {
    userRepository = {
      insert: jest.fn(),
    };

    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it('should create a user', async () => {
    const user = await createUserUseCase.execute({
      name: 'name',
      email: 'email@example.com',
      password_hash: 'password_hash',
    });

    expect(user).toBeDefined();
    expect(userRepository.insert).toHaveBeenCalledWith(user);

    expect(user.name).toEqual('name');
    expect(user.email).toEqual('email@example.com');
    expect(user.password_hash).toEqual('password_hash');

    expect(user.id).toBeUndefined();
  });
});
