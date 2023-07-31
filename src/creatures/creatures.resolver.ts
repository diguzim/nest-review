import { Resolver, Query } from '@nestjs/graphql';
import { Creature } from './creature.entity';
import { CreaturesService } from './creatures.service';
import { Public } from '../decorators';

@Resolver(() => Creature)
export class CreaturesResolver {
  constructor(private creaturesService: CreaturesService) {}

  @Public()
  @Query(() => [Creature])
  async creatures(): Promise<Creature[]> {
    return this.creaturesService.findAll();
  }
}
