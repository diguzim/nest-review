import { EntitySchema } from 'typeorm';
import { User } from '../@core/domain/user/user.entity';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
      length: 50,
    },
    email: {
      type: String,
      length: 50,
    },
    password_hash: {
      type: String,
      length: 255,
    },
  },
});
