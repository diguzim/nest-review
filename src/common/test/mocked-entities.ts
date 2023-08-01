export const mockedUser = {
  id: 1,
  name: 'John Doe',
  email: 'email@example.com',
  password_hash: 'password_hash',
  creatures: [],
  items: [],
};

export const mockedCreature = {
  id: 1,
  name: 'Orc',
  userId: mockedUser.id,
  user: mockedUser,
  drops: [],
};

export const mockedItem = {
  id: 1,
  name: 'Sword',
  user: mockedUser,
  drops: [],
};

export const mockedDrop = {
  id: 1,
  creature: mockedCreature,
  item: mockedItem,
  dropRate: 0.5,
  minDrops: 1,
  maxDrops: 2,
};
