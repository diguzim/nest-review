import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User__OLD } from '../users/user.entity';
import { Drop } from '../drops/drop.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => User__OLD, (user) => user.items)
  user: User__OLD;

  @OneToMany(() => Drop, (drop) => drop.item)
  drops: Drop[];
}
