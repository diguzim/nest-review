import { Resolver, Query } from '@nestjs/graphql';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { Public } from '../decorators';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Public()
  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
