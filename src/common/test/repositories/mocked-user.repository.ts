import { IUserRepository } from '../../../@core/domain/user/user.repository';

export const mockedUserRepository: IUserRepository = {
  findAll: jest.fn(),
  insert: jest.fn(),
};
