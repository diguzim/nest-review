import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { Public } from '../decorators';
import { CreaturesService } from '../creatures/creatures.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private creaturesService: CreaturesService,
  ) {}

  @Public()
  @Query(() => [User])
  async users(): Promise<User[]> {
    const result = await this.usersService.findAllWithRelations();
    return result;
  }

  @ResolveField()
  async creatures(@Parent() user: User) {
    const { id } = user;
    return this.creaturesService.findAll({ userId: id });
  }
}
