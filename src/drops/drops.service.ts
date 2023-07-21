import { Injectable } from '@nestjs/common';
import { CreateDropDto } from './dto/create-drop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Drop } from './drop.entity';
import { Repository } from 'typeorm';
import { Creature } from '../creatures/creature.entity';
import { Item } from '../items/item.entity';

// class CreatureNotFoundError extends Error {}
// class ItemNotFoundError extends Error {}
@Injectable()
export class DropsService {
  constructor(
    @InjectRepository(Drop)
    private dropsRepository: Repository<Drop>,
    private creaturesRepository: Repository<Creature>,
    private itemsRepository: Repository<Item>,
  ) {}

  async create(createDropDto: CreateDropDto) {
    // const creature = await this.creaturesRepository.findOneBy({
    //   id: createDropDto.creatureId,
    // });
    // if (!creature) {
    //   return new CreatureNotFoundError();
    // }
    // const item = await this.itemsRepository.findOneBy({
    //   id: createDropDto.itemId,
    // });
    // if (!item) {
    //   return new ItemNotFoundError();
    // }
    // const drop = new Drop();
    // drop.creature = creature;
    // drop.item = item;
    // drop.minDrops = createDropDto.minDrops;
    // drop.maxDrops = createDropDto.maxDrops;
    // drop.dropRate = createDropDto.dropRate;
  }

  findAll() {
    return `This action returns all drops`;
  }

  findOne(id: number) {
    return `This action returns a #${id} drop`;
  }

  delete(id: number) {
    return `This action deletes a #${id} drop`;
  }
}
