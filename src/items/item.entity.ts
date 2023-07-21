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
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => User, (user) => user.items)
  user: User;

  @OneToMany(() => Drop, (drop) => drop.item)
  drops: Drop[];
}
