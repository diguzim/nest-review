import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Creature } from './creature.entity';
import { Repository } from 'typeorm';
import { CreateCreatureDto, UpdateCreatureDto } from './dto';
import { User__OLD } from '../users/user.entity';

@Injectable()
export class CreaturesService {
  constructor(
    @InjectRepository(Creature)
    private creaturesRepository: Repository<Creature>,
  ) {}

  create(createCreatureDto: CreateCreatureDto, user: User__OLD) {
    const creature = new Creature();
    creature.name = createCreatureDto.name;
    creature.user = user;

    return this.creaturesRepository.save(creature);
  }

  findAll(params?: any): Promise<Creature[]> {
    return this.creaturesRepository.find(params);
  }

  findOne(id: number): Promise<Creature | null> {
    return this.creaturesRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateCreatureDto: UpdateCreatureDto,
  ): Promise<Creature | null> {
    let creature = await this.creaturesRepository.findOneBy({ id });

    if (!creature) {
      return null;
    }

    creature.name = updateCreatureDto.name;
    creature = await this.creaturesRepository.save(creature);
    return creature;
  }

  delete(id: number) {
    return this.creaturesRepository.delete(id);
  }
}
