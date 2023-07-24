import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDropDto } from './dto/create-drop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Drop } from './drop.entity';
import { Repository } from 'typeorm';
import { Creature } from '../creatures/creature.entity';
import { Item } from '../items/item.entity';

export class CreatureNotFoundError extends NotFoundException {
  constructor() {
    super('Creature not found');
  }
}
export class ItemNotFoundError extends NotFoundException {
  constructor() {
    super('Item not found');
  }
}
@Injectable()
export class DropsService {
  constructor(
    @InjectRepository(Drop)
    private dropsRepository: Repository<Drop>,
    @InjectRepository(Creature)
    private creaturesRepository: Repository<Creature>,
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  async create(createDropDto: CreateDropDto) {
    const creature = await this.creaturesRepository.findOneBy({
      id: createDropDto.creatureId,
    });
    if (!creature) {
      return new CreatureNotFoundError();
    }

    const item = await this.itemsRepository.findOneBy({
      id: createDropDto.itemId,
    });
    if (!item) {
      return new ItemNotFoundError();
    }

    const drop = new Drop();
    drop.creature = creature;
    drop.item = item;
    drop.dropRate = createDropDto.dropRate;
    drop.minDrops = createDropDto.minDrops;
    drop.maxDrops = createDropDto.maxDrops;

    return this.dropsRepository.save(drop);
  }

  findAll() {
    return this.dropsRepository.find();
  }

  findOne(id: number) {
    return this.dropsRepository.findOneBy({ id });
  }

  async update(id: number, updateDropDto: CreateDropDto) {
    const creature = await this.creaturesRepository.findOneBy({
      id: updateDropDto.creatureId,
    });
    if (!creature) {
      return new CreatureNotFoundError();
    }

    const item = await this.itemsRepository.findOneBy({
      id: updateDropDto.itemId,
    });
    if (!item) {
      return new ItemNotFoundError();
    }

    let drop = await this.dropsRepository.findOneBy({ id });
    console.log('drop', drop);

    if (!drop) {
      return null;
    }

    drop.creature = creature;
    drop.item = item;
    drop.dropRate = updateDropDto.dropRate;
    drop.minDrops = updateDropDto.minDrops;
    drop.maxDrops = updateDropDto.maxDrops;

    drop = await this.dropsRepository.save(drop);
    return drop;
  }

  delete(id: number) {
    return this.dropsRepository.delete(id);
  }
}
