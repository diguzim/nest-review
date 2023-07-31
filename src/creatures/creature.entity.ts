import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Drop } from '../drops/drop.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Creature {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ nullable: false })
  @Field()
  name: string;

  @ManyToOne(() => User, (user) => user.creatures)
  user: User;

  @OneToMany(() => Drop, (drop) => drop.creature)
  drops: Drop[];
}
