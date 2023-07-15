import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Creature } from './creature.entity';
import { Repository } from 'typeorm';
import { CreateCreatureDto, UpdateCreatureDto } from './dto';

@Injectable()
export class CreaturesService {
  constructor(
    @InjectRepository(Creature)
    private creaturesRepository: Repository<Creature>,
  ) {}

  async create(createCreatureDto: CreateCreatureDto) {
    const creature = new Creature();
    creature.name = createCreatureDto.name;
    return this.creaturesRepository.save(creature);
  }

  findAll(): Promise<Creature[]> {
    return this.creaturesRepository.find();
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

  async delete(id: number) {
    return await this.creaturesRepository.delete(id);
  }
}
