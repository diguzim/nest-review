import { User } from '../../@core/domain/user/user.entity';

export type UserSerialized = {
  id: number;
  name: string;
  email: string;
};

export class UserSerializer {
  public static serialize(user: User): UserSerialized {
    return {
      id: user.id as number,
      name: user.name,
      email: user.email,
    };
  }
}
