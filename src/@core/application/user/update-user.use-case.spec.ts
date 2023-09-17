import { mockedUserRepository } from '../../../common/test/repositories/mocked-user.repository';
import { ICryptService } from '../../services';
import { UpdateUserUseCase } from './update-user.use-case';

describe('UpdateUserUseCase', () => {
  let updateUserUseCase: UpdateUserUseCase;
  const userRepository = mockedUserRepository;
  let cryptService: ICryptService;

  beforeEach(() => {
    cryptService = {
      hash: jest.fn((password) => Promise.resolve(`${password}_hash`)),
    };

    updateUserUseCase = new UpdateUserUseCase(userRepository, cryptService);
  });

  it('should update user', async () => {
    const input = {
      id: 1,
      name: 'John Doe',
      email: 'email@example.com',
      password: 'password',
    };

    const user = await updateUserUseCase.execute(input);

    expect(user).toBeDefined();
    expect(userRepository.update).toHaveBeenCalled();
    expect(cryptService.hash).toHaveBeenCalledWith('password');
  });
});
