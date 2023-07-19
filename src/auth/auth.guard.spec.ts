import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { Reflector } from '@nestjs/core';
import { UnauthorizedException } from '@nestjs/common';
import { mockedUser } from '../common/test/mocked-entities';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwt_service: JwtService;
  let users_service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
    jwt_service = module.get<JwtService>(JwtService);
    users_service = module.get<UsersService>(UsersService);
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
          jest.spyOn(jwt_service, 'verifyAsync').mockResolvedValue({
            sub: 'some_user_id',
          });
          jest.spyOn(users_service, 'findOne').mockResolvedValue(mockedUser);

          expect(await guard.canActivate(context as any)).toBe(true);
        });
      });
    });
  });
});
