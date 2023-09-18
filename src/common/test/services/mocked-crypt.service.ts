import { ICryptService } from '../../../@core/services';

export const mockedCryptService: ICryptService = {
  hash: jest.fn((password) => Promise.resolve(`${password}_hash`)),
  compare: jest.fn(),
};
