import { User } from '../../@core/domain/user/user.entity';

export const mockedUser__OLD = {
  id: 1,
  name: 'John Doe',
  email: 'email@example.com',
  password_hash: 'password_hash',
  creatures: [],
  items: [],
};

export const mockedCreature__OLD = {
  id: 1,
  name: 'Orc',
  userId: mockedUser__OLD.id,
  user: mockedUser__OLD,
  drops: [],
};

export const mockedItem__OLD = {
  id: 1,
  name: 'Sword',
  user: mockedUser__OLD,
  drops: [],
};

export const mockedDrop = {
  id: 1,
  creature: mockedCreature__OLD,
  item: mockedItem__OLD,
  dropRate: 0.5,
  minDrops: 1,
  maxDrops: 2,
};

// --------------------------------------------------

export const mockedUser = User.create({
  id: 1,
  name: 'John Doe',
  email: 'email@example.com',
  password_hash: 'password_hash',
});
