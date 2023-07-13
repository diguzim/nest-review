import { Module } from '@nestjs/common';
import { CreaturesController } from './creatures.controller';
import { CreaturesService } from './creatures.service';
import { Creature } from './creature.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Creature])],
  controllers: [CreaturesController],
  providers: [CreaturesService],
  exports: [CreaturesService],
})
export class CreaturesModule {}
