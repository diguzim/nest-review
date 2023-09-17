import { mockedUserRepository } from '../../../common/test/repositories/mocked-user.repository';
import { GetAllUsersUseCase } from './get-all-users.use-case';

describe('GetAllUsersUseCase', () => {
  let getAllUsersUseCase: GetAllUsersUseCase;
  const userRepository = mockedUserRepository;

  beforeEach(() => {
    getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
  });

  it('should return all users', async () => {
    await getAllUsersUseCase.execute();
    expect(userRepository.findAll).toHaveBeenCalled();
  });
});
