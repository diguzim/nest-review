import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Args,
  Int,
  Mutation,
} from '@nestjs/graphql';
import { User__OLD } from './user.entity';
import { UsersService } from './users.service';
import { Public } from '../decorators';
import { CreaturesService } from '../creatures/creatures.service';
import { CreateUserDto } from './dto';

@Resolver(() => User__OLD)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private creaturesService: CreaturesService,
  ) {}

  @Public()
  @Query(() => [User__OLD])
  async users(
    @Args('id', {
      nullable: true,
      type: () => Int,
    })
    id?: number,
  ): Promise<User__OLD[]> {
    if (id) {
      const user = await this.usersService.findOne(id);
      return user ? [user] : [];
    }

    const result = await this.usersService.findAllWithRelations();
    return result;
  }

  @ResolveField()
  async creatures(@Parent() user: User__OLD) {
    const { id } = user;
    return this.creaturesService.findAll({ userId: id });
  }

  @Public()
  @Mutation(() => User__OLD)
  async createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
