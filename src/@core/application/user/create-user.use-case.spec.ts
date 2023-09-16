import { IUserRepository } from '../../domain/user/user.repository';
import { IEmailService } from '../../services/email.service';
import { CreateUserUseCase } from './create-user.use-case';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: IUserRepository;
  let emailNotification: IEmailService;

  beforeEach(() => {
    userRepository = {
      insert: jest.fn(),
    };
    emailNotification = {
      sendEmail: jest.fn(),
    };

    createUserUseCase = new CreateUserUseCase(
      userRepository,
      emailNotification,
    );
  });

  it('should create a user', async () => {
    const user = await createUserUseCase.execute({
      name: 'name',
      email: 'email@example.com',
      password_hash: 'password_hash',
    });

    expect(user).toBeDefined();
    expect(userRepository.insert).toHaveBeenCalledWith(user);
    expect(emailNotification.sendEmail).toHaveBeenCalledWith(
      user.email,
      'Welcome to the app!',
    );

    expect(user.name).toEqual('name');
    expect(user.email).toEqual('email@example.com');
    expect(user.password_hash).toEqual('password_hash');

    expect(user.id).toBeUndefined();
  });
});
