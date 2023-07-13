import { Injectable } from '@nestjs/common';
import { Creature } from './interfaces';

@Injectable()
export class CreaturesService {
  private readonly creatures: Creature[] = [];

  create(creature: Creature) {
    this.creatures.push(creature);
  }

  findAll(): Creature[] {
    return this.creatures;
  }
}
