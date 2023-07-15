import { Test, TestingModule } from '@nestjs/testing';
import { CreaturesService } from './creatures.service';
import { Repository } from 'typeorm';
import { Creature } from './creature.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CreaturesService', () => {
  let service: CreaturesService;
  let creatureRepository: Repository<Creature>;

  const CREATURE_REPOSITORY_TOKEN = getRepositoryToken(Creature);

  const creature_id = 1;
  const mockedCreature = {
    id: creature_id,
    name: 'Orc',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreaturesService,
        {
          provide: CREATURE_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn((creature) => creature),
            find: jest.fn(),
            findOneBy: jest.fn(),
            delete: jest.fn(),
          },
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
    const createCreatureDto = { name: mockedCreature.name };

    it('should save a creature using the creature repository', async () => {
      await service.create(createCreatureDto);

      expect(creatureRepository.save).toHaveBeenCalledWith(createCreatureDto);
    });
  });

  describe('findAll', () => {
    const mockedCreatures = [mockedCreature];

    it('should return an array of creatures using the creature repository', async () => {
      jest.spyOn(creatureRepository, 'find').mockResolvedValue(mockedCreatures);

      const creatures = await service.findAll();

      expect(creatures).toEqual(mockedCreatures);

      expect(creatureRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a creature using the creature repository', async () => {
      jest
        .spyOn(creatureRepository, 'findOneBy')
        .mockResolvedValue(mockedCreature);

      const creature = await service.findOne(creature_id);

      expect(creature).toEqual(mockedCreature);

      expect(creatureRepository.findOneBy).toHaveBeenCalledWith({
        id: creature_id,
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
          .mockResolvedValue(mockedCreature);

        await service.update(creature_id, updateCreatureDto);

        expect(creatureRepository.findOneBy).toHaveBeenCalledWith({
          id: creature_id,
        });

        expect(creatureRepository.save).toHaveBeenCalledWith({
          ...mockedCreature,
          ...updateCreatureDto,
        });
      });
    });

    describe('when the creature does not exist', () => {
      it('should throw a NotFoundException', async () => {
        jest.spyOn(creatureRepository, 'findOneBy').mockResolvedValue(null);

        const creature = await service.update(creature_id, updateCreatureDto);

        expect(creature).toEqual(null);
        expect(creatureRepository.findOneBy).toHaveBeenCalledWith({
          id: creature_id,
        });
      });
    });
  });

  describe('delete', () => {
    it('should delete creature using the creature repository', async () => {
      jest
        .spyOn(creatureRepository, 'findOneBy')
        .mockResolvedValue(mockedCreature);

      await service.delete(creature_id);

      expect(creatureRepository.delete).toHaveBeenCalledWith(creature_id);
    });
  });
});
