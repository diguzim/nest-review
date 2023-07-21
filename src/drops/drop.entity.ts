import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Creature } from '../creatures/creature.entity';
import { Item } from '../items/item.entity';

@Entity()
export class Drop {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Creature, (creature) => creature.drops, {
    nullable: false,
    eager: true,
  })
  creature: Creature;

  @ManyToOne(() => Item, (item) => item.drops, {
    nullable: false,
    eager: true,
  })
  item: Item;

  @Column({ nullable: false })
  dropRate: number;

  @Column({ nullable: false })
  minDrops: number;

  @Column({ nullable: false })
  maxDrops: number;
}
