import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Creature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
