import { Module } from '@nestjs/common';
import { DropsService } from './drops.service';
import { DropsController } from './drops.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drop } from './drop.entity';
import { Creature } from '../creatures/creature.entity';
import { Item } from '../items/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Drop, Creature, Item])],
  controllers: [DropsController],
  providers: [DropsService],
  exports: [DropsService],
})
export class DropsModule {}
