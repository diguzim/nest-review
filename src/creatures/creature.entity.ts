import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Drop } from '../drops/drop.entity';

@Entity()
export class Creature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => User, (user) => user.creatures)
  user: User;

  @OneToMany(() => Drop, (drop) => drop.creature)
  drops: Drop[];
}
