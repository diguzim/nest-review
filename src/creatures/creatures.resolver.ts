import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Creature } from './creature.entity';
import { CreaturesService } from './creatures.service';
import { Public } from '../decorators';
import { UsersService } from '../users/users.service';

@Resolver(() => Creature)
export class CreaturesResolver {
  constructor(
    private creaturesService: CreaturesService,
    private usersService: UsersService,
  ) {}

  @Public()
  @Query(() => [Creature])
  async creatures(): Promise<Creature[]> {
    return this.creaturesService.findAll();
  }

  @ResolveField()
  async user(@Parent() creature: Creature) {
    return this.usersService.findOne(creature.userId);
  }
}
