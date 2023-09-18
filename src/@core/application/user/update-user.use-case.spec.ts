import { mockedUserRepository } from '../../../common/test/repositories/mocked-user.repository';
import { mockedCryptService } from '../../../common/test/services';
import { IUserRepository } from '../../domain/user/user.repository';
import { UpdateUserUseCase } from './update-user.use-case';

describe('UpdateUserUseCase', () => {
  let updateUserUseCase: UpdateUserUseCase;
  let userRepository: IUserRepository;
  const cryptService = mockedCryptService;

  const input = {
    id: 1,
    name: 'John Doe',
    email: 'email@example.com',
    password: 'password',
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('when an user exists', () => {
    beforeEach(() => {
      userRepository = {
        ...mockedUserRepository,
        findOne: jest.fn().mockResolvedValue({
          id: 1,
          name: 'John Doe',
          email: 'email@example.com',
          password_hash: 'password_hash',
        }),
      };

      updateUserUseCase = new UpdateUserUseCase(userRepository, cryptService);
    });

    it('should update user and return it', async () => {
      const user = await updateUserUseCase.execute(input);

      expect(user).toBeDefined();
      expect(userRepository.update).toHaveBeenCalled();
      expect(cryptService.hash).toHaveBeenCalledWith('password');
    });
  });

  describe("when an user doesn't exists", () => {
    beforeEach(() => {
      userRepository = {
        ...mockedUserRepository,
        findOne: jest.fn().mockResolvedValue(null),
      };

      updateUserUseCase = new UpdateUserUseCase(userRepository, cryptService);
    });

    it('should return a null value', async () => {
      const user = await updateUserUseCase.execute(input);

      expect(user).toBeNull();
      expect(userRepository.update).not.toHaveBeenCalled();
      expect(cryptService.hash).not.toHaveBeenCalled();
    });
  });
});
