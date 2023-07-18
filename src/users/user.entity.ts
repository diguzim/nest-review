import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Creature } from '../creatures/creature.entity';
import { Item } from '../items/item.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  @Exclude()
  password_hash: string;

  @OneToMany(() => Creature, (creature) => creature.user)
  @Exclude()
  creatures: Creature[];

  @OneToMany(() => Item, (item) => item.user)
  @Exclude()
  items: Item[];
}
