import { Test, TestingModule } from '@nestjs/testing';
import {
  CreatureNotFoundError,
  DropsService,
  ItemNotFoundError,
} from './drops.service';
import { Repository } from 'typeorm';
import { Creature } from '../creatures/creature.entity';
import { Item } from '../items/item.entity';
import { Drop } from './drop.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { generateMockedRepository } from '../common/test/mocked-providers';
import {
  mockedCreature,
  mockedDrop,
  mockedItem,
} from '../common/test/mocked-entities';

describe('DropsService', () => {
  let service: DropsService;
  let dropsRepository: Repository<Drop>;
  let creaturesRepository: Repository<Creature>;
  let itemsRepository: Repository<Item>;

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
    dropsRepository = module.get<Repository<Drop>>(DROP_REPOSITORY_TOKEN);
    creaturesRepository = module.get<Repository<Creature>>(
      CREATURE_REPOSITORY_TOKEN,
    );
    itemsRepository = module.get<Repository<Item>>(ITEM_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createDropDto = {
      creatureId: mockedCreature.id,
      itemId: mockedItem.id,
      dropRate: 0.5,
      minDrops: 1,
      maxDrops: 2,
    };

    describe('when the creature does not exist', () => {
      it('should return an instance of CreatureNotFoundError', async () => {
        jest.spyOn(creaturesRepository, 'findOneBy').mockResolvedValue(null);

        const result = await service.create(createDropDto);

        expect(result).toBeInstanceOf(CreatureNotFoundError);
      });
    });

    describe('when the creature exists but the item does not exist', () => {
      it('should return an instance of ItemNotFoundError', async () => {
        jest
          .spyOn(creaturesRepository, 'findOneBy')
          .mockResolvedValue(mockedCreature);
        jest.spyOn(itemsRepository, 'findOneBy').mockResolvedValue(null);

        const result = await service.create(createDropDto);

        expect(result).toBeInstanceOf(ItemNotFoundError);
      });
    });

    describe('when the creature and item exist', () => {
      beforeEach(() => {
        jest
          .spyOn(creaturesRepository, 'findOneBy')
          .mockResolvedValue(mockedCreature);
        jest.spyOn(itemsRepository, 'findOneBy').mockResolvedValue(mockedItem);
      });

      it('should save a drop using the drop repository', async () => {
        await service.create(createDropDto);

        expect(dropsRepository.save).toHaveBeenCalledWith({
          creature: mockedCreature,
          item: mockedItem,
          dropRate: createDropDto.dropRate,
          minDrops: createDropDto.minDrops,
          maxDrops: createDropDto.maxDrops,
        });
      });
    });
  });

  describe('findAll', () => {
    const mockedDrops = [mockedDrop];

    it('should return an array of drops using the drop repository', async () => {
      jest.spyOn(dropsRepository, 'find').mockResolvedValue(mockedDrops);

      const drops = await service.findAll();

      expect(drops).toEqual(mockedDrops);

      expect(dropsRepository.find).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    const updateDropDto = {
      creatureId: mockedCreature.id,
      itemId: mockedItem.id,
      dropRate: 0.5,
      minDrops: 1,
      maxDrops: 2,
    };

    describe('when the creature does not exist', () => {
      it('should return an instance of CreatureNotFoundError', async () => {
        jest.spyOn(creaturesRepository, 'findOneBy').mockResolvedValue(null);

        const result = await service.update(mockedDrop.id, updateDropDto);

        expect(result).toBeInstanceOf(CreatureNotFoundError);
      });
    });

    describe('when the creature exists but the item does not exist', () => {
      it('should return an instance of ItemNotFoundError', async () => {
        jest
          .spyOn(creaturesRepository, 'findOneBy')
          .mockResolvedValue(mockedCreature);
        jest.spyOn(itemsRepository, 'findOneBy').mockResolvedValue(null);

        const result = await service.update(mockedDrop.id, updateDropDto);

        expect(result).toBeInstanceOf(ItemNotFoundError);
      });
    });

    describe('when the creature and item exist', () => {
      beforeEach(() => {
        jest
          .spyOn(creaturesRepository, 'findOneBy')
          .mockResolvedValue(mockedCreature);
        jest.spyOn(itemsRepository, 'findOneBy').mockResolvedValue(mockedItem);
      });

      describe('when the drop does not exist', () => {
        it('should return null', async () => {
          jest.spyOn(dropsRepository, 'findOneBy').mockResolvedValue(null);

          const result = await service.update(mockedDrop.id, updateDropDto);

          expect(result).toBeNull();
        });
      });

      describe('when the drop exists', () => {
        it('should update and return the updated drop', async () => {
          jest
            .spyOn(dropsRepository, 'findOneBy')
            .mockResolvedValue(mockedDrop);

          await service.update(mockedDrop.id, updateDropDto);

          expect(dropsRepository.save).toHaveBeenCalledWith({
            id: mockedDrop.id,
            creature: mockedCreature,
            item: mockedItem,
            dropRate: updateDropDto.dropRate,
            minDrops: updateDropDto.minDrops,
            maxDrops: updateDropDto.maxDrops,
          });
        });
      });
    });
  });

  describe('findOne', () => {
    it('should return a drop using the drop repository', async () => {
      jest.spyOn(dropsRepository, 'findOneBy').mockResolvedValue(mockedDrop);

      const drop = await service.findOne(mockedDrop.id);

      expect(drop).toEqual(mockedDrop);

      expect(dropsRepository.findOneBy).toHaveBeenCalledWith({
        id: mockedDrop.id,
      });
    });
  });

  describe('delete', () => {
    it('should delete a drop using the drop repository', async () => {
      jest.spyOn(dropsRepository, 'findOneBy').mockResolvedValue(mockedDrop);

      await service.delete(mockedDrop.id);

      expect(dropsRepository.delete).toHaveBeenCalledWith(mockedDrop.id);
    });
  });
});
