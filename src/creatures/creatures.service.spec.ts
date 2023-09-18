import { Test, TestingModule } from '@nestjs/testing';
import { CreaturesService } from './creatures.service';
import { Repository } from 'typeorm';
import { Creature } from './creature.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  mockedCreature__OLD,
  mockedUser__OLD,
} from '../common/test/mocked-entities';
import { generateMockedRepository } from '../common/test/mocked-providers';

describe('CreaturesService', () => {
  let service: CreaturesService;
  let creatureRepository: Repository<Creature>;

  const CREATURE_REPOSITORY_TOKEN = getRepositoryToken(Creature);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreaturesService,
        {
          provide: CREATURE_REPOSITORY_TOKEN,
          useValue: generateMockedRepository(),
        },
      ],
    }).compile();

    service = module.get<CreaturesService>(CreaturesService);
    creatureRepository = module.get<Repository<Creature>>(
      CREATURE_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(creatureRepository).toBeDefined();
  });

  describe('create', () => {
    const createCreatureDto = {
      name: mockedCreature__OLD.name,
      user: mockedUser__OLD,
    };

    it('should save a creature using the creature repository', async () => {
      await service.create(createCreatureDto, mockedUser__OLD);

      expect(creatureRepository.save).toHaveBeenCalledWith(createCreatureDto);
    });
  });

  describe('findAll', () => {
    const mockedCreatures = [mockedCreature__OLD];
    describe('without params', () => {
      it('should return an array of creatures using the creature repository', async () => {
        jest
          .spyOn(creatureRepository, 'find')
          .mockResolvedValue(mockedCreatures);

        const creatures = await service.findAll();

        expect(creatures).toEqual(mockedCreatures);

        expect(creatureRepository.find).toHaveBeenCalledWith(undefined);
      });
    });

    describe('without params', () => {
      it('should return an array of creatures using the creature repository', async () => {
        const params = { userId: mockedUser__OLD.id };
        jest
          .spyOn(creatureRepository, 'find')
          .mockResolvedValue(mockedCreatures);

        const creatures = await service.findAll(params);

        expect(creatures).toEqual(mockedCreatures);

        expect(creatureRepository.find).toHaveBeenCalledWith(params);
      });
    });
  });

  describe('findOne', () => {
    it('should return a creature using the creature repository', async () => {
      jest
        .spyOn(creatureRepository, 'findOneBy')
        .mockResolvedValue(mockedCreature__OLD);

      const creature = await service.findOne(mockedCreature__OLD.id);

      expect(creature).toEqual(mockedCreature__OLD);

      expect(creatureRepository.findOneBy).toHaveBeenCalledWith({
        id: mockedCreature__OLD.id,
      });
    });
  });

  describe('update', () => {
    const updateCreatureDto = {
      name: 'Troll',
    };

    describe('when the creature exists', () => {
      it('should update the creature using the creature repository', async () => {
        jest
          .spyOn(creatureRepository, 'findOneBy')
          .mockResolvedValue(mockedCreature__OLD);

        await service.update(mockedCreature__OLD.id, updateCreatureDto);

        expect(creatureRepository.findOneBy).toHaveBeenCalledWith({
          id: mockedCreature__OLD.id,
        });

        expect(creatureRepository.save).toHaveBeenCalledWith({
          ...mockedCreature__OLD,
          ...updateCreatureDto,
        });
      });
    });

    describe('when the creature does not exist', () => {
      it('should return null', async () => {
        jest.spyOn(creatureRepository, 'findOneBy').mockResolvedValue(null);

        const creature = await service.update(
          mockedCreature__OLD.id,
          updateCreatureDto,
        );

        expect(creature).toEqual(null);
        expect(creatureRepository.findOneBy).toHaveBeenCalledWith({
          id: mockedCreature__OLD.id,
        });
      });
    });
  });

  describe('delete', () => {
    it('should delete creature using the creature repository', async () => {
      jest
        .spyOn(creatureRepository, 'findOneBy')
        .mockResolvedValue(mockedCreature__OLD);

      await service.delete(mockedCreature__OLD.id);

      expect(creatureRepository.delete).toHaveBeenCalledWith(
        mockedCreature__OLD.id,
      );
    });
  });
});
