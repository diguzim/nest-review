import { mockedUser } from '../../../common/test/mocked-entities';
import { mockedUserRepository } from '../../../common/test/repositories/mocked-user.repository';
import { mockedCryptService } from '../../../common/test/services';
import { IUserRepository } from '../../domain/user/user.repository';
import { ICryptService, IJWTService } from '../../services';
import {
  AuthenticateUserInput,
  AuthenticateUserUseCase,
} from './authenticate-user.use-case';

describe('AuthenticateUserUseCase', () => {
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let userRepository: IUserRepository;
  let cryptService: ICryptService;
  let jwtService: IJWTService;

  const input: AuthenticateUserInput = {
    email: 'email@example.com',
    password: 'any_password',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    describe('when user is not found', () => {
      beforeEach(() => {
        userRepository = {
          ...mockedUserRepository,
          findOneBy: jest.fn().mockResolvedValue(null),
        };

        authenticateUserUseCase = new AuthenticateUserUseCase(
          userRepository,
          cryptService,
          jwtService,
        );
      });

      it('should return null when user is not found', async () => {
        const result = await authenticateUserUseCase.execute(input);

        expect(userRepository.findOneBy).toHaveBeenCalledWith({
          email: input.email,
        });

        expect(result).toBeNull();
      });
    });

    describe('when user is found', () => {
      beforeEach(() => {
        userRepository = {
          ...mockedUserRepository,
          findOneBy: jest.fn().mockResolvedValue(mockedUser),
        };
      });

      describe('when password is incorrect', () => {
        beforeEach(() => {
          cryptService = {
            ...mockedCryptService,
            compare: jest.fn().mockResolvedValue(false),
          };

          authenticateUserUseCase = new AuthenticateUserUseCase(
            userRepository,
            cryptService,
            jwtService,
          );
        });

        it('should throw an UnauthorizedException', async () => {
          await expect(
            authenticateUserUseCase.execute(input),
          ).rejects.toThrowError('Unauthorized');

          expect(cryptService.compare).toHaveBeenCalledWith(
            input.password,
            mockedUser.password_hash,
          );
        });
      });

      describe('when password is correct', () => {
        beforeEach(() => {
          cryptService = {
            ...mockedCryptService,
            compare: jest.fn().mockResolvedValue(true),
          };

          jwtService = {
            ...jwtService,
            signAsync: jest.fn().mockResolvedValue('any_token'),
          };

          authenticateUserUseCase = new AuthenticateUserUseCase(
            userRepository,
            cryptService,
            jwtService,
          );
        });

        it('should return an access token', async () => {
          const result = await authenticateUserUseCase.execute(input);

          expect(jwtService.signAsync).toHaveBeenCalledWith({
            sub: mockedUser.id,
            email: mockedUser.email,
          });

          expect(result).toEqual({
            access_token: 'any_token',
          });
        });
      });
    });
  });
});
