import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User__OLD } from '../users/user.entity';
import { Drop } from '../drops/drop.entity';
import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Creature {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ nullable: false })
  @Field()
  name: string;

  @Column()
  @HideField()
  userId: number;

  @ManyToOne(() => User__OLD, (user) => user.creatures)
  @Field(() => User__OLD, { nullable: true })
  user: User__OLD;

  @OneToMany(() => Drop, (drop) => drop.creature)
  drops: Drop[];
}
