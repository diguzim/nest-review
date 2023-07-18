import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let hashSpy: jest.SpyInstance;
  let genSaltSpy: jest.SpyInstance;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  const user_id = 1;
  const mockedUser = {
    id: user_id,
    name: 'John Doe',
    email: 'email@example.com',
    password_hash: 'password_hashed',
    creatures: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn((user) => user),
            find: jest.fn(),
            findOneBy: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
    hashSpy = jest.spyOn(bcrypt, 'hash');
    genSaltSpy = jest.spyOn(bcrypt, 'genSalt');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('create', () => {
    it("should save a user with it's password hashed using the user repository", async () => {
      const mockedPasswordHash = 'password_hashed';
      hashSpy.mockResolvedValue(mockedPasswordHash);
      genSaltSpy.mockResolvedValue('mockedSalt');

      jest.spyOn(service as any, 'hashPassword');

      const createUserDto = {
        name: 'John Doe',
        email: 'email@example.com',
        password: 'password',
      };
      await service.create(createUserDto);

      expect(service['hashPassword']).toHaveBeenCalledWith(
        createUserDto.password,
      );

      expect(userRepository.save).toHaveBeenCalledWith({
        name: createUserDto.name,
        email: createUserDto.email,
        password_hash: mockedPasswordHash,
      });
    });
  });

  describe('findAll', () => {
    it('should return all users using the user repository', async () => {
      const mockedUsers = [mockedUser];

      jest.spyOn(userRepository, 'find').mockResolvedValue(mockedUsers);

      const users = await service.findAll();

      expect(users).toEqual(mockedUsers);

      expect(userRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return user using the user repository', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockedUser);

      const user = await service.findOne(user_id);

      expect(user).toEqual(mockedUser);

      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: user_id });
    });
  });

  describe('findOneBy', () => {
    it('should return user using the user repository', async () => {
      const options = { email: 'email@example.com' };
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockedUser);

      const user = await service.findOneBy(options);

      expect(user).toEqual(mockedUser);

      expect(userRepository.findOneBy).toHaveBeenCalledWith(options);
    });
  });

  describe('update', () => {
    const updateUserDto = {
      name: 'John Doe',
      email: 'email@example.com',
      password: 'password',
    };

    describe('when the user exists', () => {
      it("should update user with it's password hashed using the user repository", async () => {
        const mockedPasswordHash = 'password_hashed';
        hashSpy.mockResolvedValue(mockedPasswordHash);
        genSaltSpy.mockResolvedValue('mockedSalt');

        jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockedUser);

        jest.spyOn(service as any, 'hashPassword');

        const user = await service.update(user_id, updateUserDto);

        expect(service['hashPassword']).toHaveBeenCalledWith(
          updateUserDto.password,
        );

        expect(userRepository.save).toHaveBeenCalledWith({
          id: user_id,
          name: updateUserDto.name,
          email: updateUserDto.email,
          password_hash: mockedPasswordHash,
          creatures: [],
        });

        expect(user).toEqual(mockedUser);
      });
    });

    describe('when the user does not exist', () => {
      it('should return null', async () => {
        jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

        const user = await service.update(user_id, updateUserDto);

        expect(user).toEqual(null);

        expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: user_id });
      });
    });
  });

  describe('delete', () => {
    it('should delete user using the user repository', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockedUser);

      await service.delete(user_id);

      expect(userRepository.delete).toHaveBeenCalledWith(user_id);
    });
  });
});
