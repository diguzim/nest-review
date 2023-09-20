import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { UnauthorizedException } from '@nestjs/common';
import { mockedUser } from '../common/test/mocked-entities';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserTypeOrmRepository } from '../common/repositories/typeorm/user-typeorm.repository';
import { IUserRepository } from '../@core/domain/user/user.repository';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: JwtService;
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthGuard,
          useFactory: (
            jwtService: JwtService,
            reflector: Reflector,
            configService: ConfigService,
            userRepository: IUserRepository,
          ) => {
            return new AuthGuard(
              jwtService,
              reflector,
              configService,
              userRepository,
            );
          },
          inject: [JwtService, Reflector, ConfigService, UserTypeOrmRepository],
        },
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: UserTypeOrmRepository,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
    jwtService = module.get<JwtService>(JwtService);
    userRepository = module.get<UserTypeOrmRepository>(UserTypeOrmRepository);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('when the handler is public', () => {
    it('should return true', async () => {
      const reflector = guard['reflector'];
      (reflector.getAllAndOverride as jest.Mock).mockReturnValue(true);

      const context = {
        getHandler: jest.fn(),
        getClass: jest.fn(),
      };

      expect(await guard.canActivate(context as any)).toBe(true);
    });
  });

  describe('when the handler is not public', () => {
    beforeEach(() => {
      const reflector = guard['reflector'];
      (reflector.getAllAndOverride as jest.Mock).mockReturnValue(false);
    });

    describe('when context.switchToHttp().getRequest() returns undefined', () => {
      describe('when GqlExecutionContext.create(context).getContext().req raises an error', () => {
        it('should throw UnauthorizedException', async () => {
          // stub GqlExecutionContext.create
          jest.spyOn(GqlExecutionContext, 'create').mockReturnValue({
            getContext: jest.fn().mockImplementation(() => {
              throw new Error();
            }),
          } as any);

          const context = {
            getHandler: jest.fn(),
            getClass: jest.fn(),
            switchToHttp: jest.fn().mockReturnThis(),
            getRequest: jest.fn().mockReturnValue(undefined),
          };

          await expect(guard.canActivate(context as any)).rejects.toThrow(
            UnauthorizedException,
          );
        });
      });

      describe('when GqlExecutionContext.create(context).getContext().req returns undefined', () => {
        it('should throw UnauthorizedException', async () => {
          // stub GqlExecutionContext.create
          jest.spyOn(GqlExecutionContext, 'create').mockReturnValue({
            getContext: jest.fn().mockReturnValue({
              req: undefined,
            }),
          } as any);

          const context = {
            getHandler: jest.fn(),
            getClass: jest.fn(),
            switchToHttp: jest.fn().mockReturnThis(),
            getRequest: jest.fn().mockReturnValue(undefined),
          };

          await expect(guard.canActivate(context as any)).rejects.toThrow(
            UnauthorizedException,
          );
        });
      });

      describe('when GqlExecutionContext.create(context).getContext().req returns a request', () => {
        it('should throw UnauthorizedException if there is no authorization header', async () => {
          // stub GqlExecutionContext.create
          jest.spyOn(GqlExecutionContext, 'create').mockReturnValue({
            getContext: jest.fn().mockReturnValue({
              req: {
                headers: {},
              },
            }),
          } as any);

          const context = {
            getHandler: jest.fn(),
            getClass: jest.fn(),
            switchToHttp: jest.fn().mockReturnThis(),
            getRequest: jest.fn().mockReturnValue(undefined),
          };

          await expect(guard.canActivate(context as any)).rejects.toThrow(
            UnauthorizedException,
          );
        });
      });
    });

    describe('when no token could be extracted from the headers', () => {
      it('should throw UnauthorizedException', async () => {
        const context = {
          getHandler: jest.fn(),
          getClass: jest.fn(),
          switchToHttp: jest.fn().mockReturnThis(),
          getRequest: jest.fn().mockReturnValue({
            headers: {},
          }),
        };

        await expect(guard.canActivate(context as any)).rejects.toThrow(
          UnauthorizedException,
        );
      });
    });

    describe('when a token could be extracted from the headers', () => {
      describe('when the token could not be verified', () => {
        const context = {
          getHandler: jest.fn(),
          getClass: jest.fn(),
          switchToHttp: jest.fn().mockReturnThis(),
          getRequest: jest.fn().mockReturnValue({
            headers: {
              authorization: 'Bearer some_wrong_token',
            },
          }),
        };

        it('should throw UnauthorizedException', async () => {
          await expect(guard.canActivate(context as any)).rejects.toThrow(
            UnauthorizedException,
          );
        });
      });

      describe('when the token could be verified', () => {
        const context = {
          getHandler: jest.fn(),
          getClass: jest.fn(),
          switchToHttp: jest.fn().mockReturnThis(),
          getRequest: jest.fn().mockReturnValue({
            headers: {
              authorization:
                'Bearer now_will_work_because_i_will_mock_jwt_service',
            },
          }),
        };

        it('should return true', async () => {
          jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue({
            sub: 'some_user_id',
          });
          jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockedUser);

          expect(await guard.canActivate(context as any)).toBe(true);
        });
      });
    });
  });
});
