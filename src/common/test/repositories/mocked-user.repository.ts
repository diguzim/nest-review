import { IUserRepository } from '../../../@core/domain/user/user.repository';

export const mockedUserRepository: IUserRepository = {
  insert: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
};
