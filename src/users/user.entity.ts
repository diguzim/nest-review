import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Creature } from '../creatures/creature.entity';
import { Item } from '../items/item.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ nullable: false })
  @Field()
  name: string;

  @Column({ nullable: false })
  @Field()
  email: string;

  @Column({ nullable: false })
  @Exclude()
  @Field()
  password_hash: string;

  @OneToMany(() => Creature, (creature) => creature.user)
  @Exclude()
  // @Field()
  creatures: Creature[];

  @OneToMany(() => Item, (item) => item.user)
  @Exclude()
  // @Field()
  items: Item[];
}
