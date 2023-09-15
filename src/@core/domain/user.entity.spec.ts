import { User } from './user.entity';

describe('UserEntity', () => {
  test('static creator', () => {
    const props = {
      name: 'test',
      email: 'email@example.com',
      password_hash: 'password_hash',
    };

    const user = User.create(props);
    expect(user).toBeInstanceOf(User);
    expect(user.name).toBe(props.name);
    expect(user.email).toBe(props.email);
    expect(user.password_hash).toBe(props.password_hash);
  });

  test('getters and setters', () => {
    const props = {
      name: 'test',
      email: 'email@example.com',
      password_hash: 'password_hash',
    };

    const user = User.create(props);
    user.id = 1;
    expect(user.id).toBe(1);
    user.name = 'test2';
    expect(user.name).toBe('test2');
    user.email = 'email2@example.com';
    expect(user.email).toBe('email2@example.com');
    user.password_hash = 'password_hash2';
    expect(user.password_hash).toBe('password_hash2');
  });
});
