import { DeleteUserUseCase } from './delete-user.use-case';
import { mockedUserRepository } from '../../../common/test/repositories/mocked-user.repository';
import { IUserRepository } from '../../domain/user/user.repository';
import { mockedUser } from '../../../common/test/mocked-entities';

describe('DeleteUserUseCase', () => {
  let deleteUserUseCase: DeleteUserUseCase;
  let userRepository: IUserRepository;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when user does not exist', () => {
    beforeEach(() => {
      userRepository = {
        ...mockedUserRepository,
        findOne: jest.fn().mockResolvedValue(null),
      };
      deleteUserUseCase = new DeleteUserUseCase(userRepository);
    });
    it('should return null', async () => {
      const user = await deleteUserUseCase.execute(1);
      expect(user).toBeNull();
      expect(userRepository.delete).not.toHaveBeenCalled();
    });
  });

  describe('when user exists', () => {
    beforeEach(() => {
      console.log('HELLO WORLD!');
      userRepository = {
        ...mockedUserRepository,
        findOne: jest.fn().mockResolvedValue(mockedUser),
      };
      deleteUserUseCase = new DeleteUserUseCase(userRepository);
    });

    it('should return the deleted user', async () => {
      const user = await deleteUserUseCase.execute(1);
      expect(user).toEqual(mockedUser);
      expect(userRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
