export function generateMockedRepository() {
  return {
    save: jest.fn((entity) => entity),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };
}
