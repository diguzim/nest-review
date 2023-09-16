import { User } from '../../@core/domain/user/user.entity';
import { UserSerializer } from './user.serializer';

describe('UserSerializer', () => {
  it('should serialize a user', () => {
    const user = User.create({
      id: 1,
      name: 'John Doe',
      email: 'email@example.com',
      password_hash: 'hashed_password',
    });

    const serialized = UserSerializer.serialize(user);

    expect(serialized).toEqual({
      id: user.id as number,
      name: user.name,
      email: user.email,
    });
  });
});
