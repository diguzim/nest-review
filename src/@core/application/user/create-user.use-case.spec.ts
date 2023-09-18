import { mockedUserRepository } from '../../../common/test/repositories/mocked-user.repository';
import {
  mockedCryptService,
  mockedEmailService,
} from '../../../common/test/services';
import { CreateUserUseCase } from './create-user.use-case';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  const userRepository = mockedUserRepository;
  const emailNotification = mockedEmailService;
  const cryptService = mockedCryptService;

  beforeEach(() => {
    createUserUseCase = new CreateUserUseCase(
      userRepository,
      emailNotification,
      cryptService,
    );
  });

  it('should create a user', async () => {
    const user = await createUserUseCase.execute({
      name: 'name',
      email: 'email@example.com',
      password: 'password',
    });

    expect(user).toBeDefined();
    expect(userRepository.insert).toHaveBeenCalledWith(user);
    expect(emailNotification.sendEmail).toHaveBeenCalledWith(
      user.email,
      'Welcome to the app!',
    );
    expect(cryptService.hash).toHaveBeenCalledWith('password');

    expect(user.name).toEqual('name');
    expect(user.email).toEqual('email@example.com');
    expect(user.password_hash).toEqual('password_hash');

    expect(user.id).toBeUndefined();
  });
});
