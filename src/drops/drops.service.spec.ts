import { Test, TestingModule } from '@nestjs/testing';
import { DropsService } from './drops.service';
import { Repository } from 'typeorm';
import { Creature } from '../creatures/creature.entity';
import { Item } from '../items/item.entity';
import { Drop } from './drop.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { generateMockedRepository } from '../common/test/mocked-providers';

describe('DropsService', () => {
  let service: DropsService;
  let dropRepository: Repository<Drop>;
  let creatureRepository: Repository<Creature>;
  let itemRepository: Repository<Item>;

  const DROP_REPOSITORY_TOKEN = getRepositoryToken(Drop);
  const CREATURE_REPOSITORY_TOKEN = getRepositoryToken(Creature);
  const ITEM_REPOSITORY_TOKEN = getRepositoryToken(Item);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DropsService,
        {
          provide: DROP_REPOSITORY_TOKEN,
          useValue: generateMockedRepository(),
        },
        {
          provide: CREATURE_REPOSITORY_TOKEN,
          useValue: generateMockedRepository(),
        },
        {
          provide: ITEM_REPOSITORY_TOKEN,
          useValue: generateMockedRepository(),
        },
      ],
    }).compile();

    service = module.get<DropsService>(DropsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
