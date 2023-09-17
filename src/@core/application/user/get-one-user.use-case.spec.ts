import { mockedUserRepository } from '../../../common/test/repositories/mocked-user.repository';
import { GetOneUserUseCase } from './get-one-user.use-case';

describe('GetOneUserUseCase', () => {
  let getOneUserUseCase: GetOneUserUseCase;
  const userRepository = mockedUserRepository;

  beforeEach(() => {
    getOneUserUseCase = new GetOneUserUseCase(userRepository);
  });

  it('should return a user', async () => {
    const id = 1;

    await getOneUserUseCase.execute(id);
    expect(userRepository.findOne).toHaveBeenCalledWith(id);
  });
});
