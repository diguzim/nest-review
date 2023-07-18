import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;
  let compareSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneBy: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    compareSpy = jest.spyOn(bcrypt, 'compare');
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('signIn', () => {
    const email = 'email@example.com';
    const password = 'password';

    describe('when user with email is not found', () => {
      it('should return null', async () => {
        jest.spyOn(userService, 'findOneBy').mockResolvedValue(null);

        const result = await authService.signIn(email, password);

        expect(result).toEqual(null);
        expect(userService.findOneBy).toHaveBeenCalledWith({ email });
      });
    });

    describe('when user with email is found', () => {
      const user = {
        id: 1,
        name: 'John Doe',
        email,
        password_hash: 'hashedPassword',
        creatures: [],
      };

      beforeEach(() => {
        jest.spyOn(userService, 'findOneBy').mockResolvedValue(user);
      });

      describe('and the password is incorrect', () => {
        beforeEach(() => {
          compareSpy.mockResolvedValue(false);
        });

        it('should throw an UnauthorizedException', async () => {
          await expect(authService.signIn(email, password)).rejects.toThrow(
            UnauthorizedException,
          );
        });
      });

      describe('and the password is correct', () => {
        beforeEach(() => {
          compareSpy.mockResolvedValue(true);
        });

        it('should return an object with access_token property', async () => {
          const result = await authService.signIn(email, password);

          expect(result).toHaveProperty('access_token');
        });
      });
    });
  });
});
