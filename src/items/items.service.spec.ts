import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  mockedItem__OLD,
  mockedUser__OLD,
} from '../common/test/mocked-entities';
import { generateMockedRepository } from '../common/test/mocked-providers';

describe('ItemsService', () => {
  let service: ItemsService;
  let itemRepository: Repository<Item>;

  const CREATURE_REPOSITORY_TOKEN = getRepositoryToken(Item);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: CREATURE_REPOSITORY_TOKEN,
          useValue: generateMockedRepository(),
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    itemRepository = module.get<Repository<Item>>(CREATURE_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(itemRepository).toBeDefined();
  });

  describe('create', () => {
    const createItemDto = { name: mockedItem__OLD.name, user: mockedUser__OLD };

    it('should save a item using the item repository', async () => {
      await service.create(createItemDto, mockedUser__OLD);

      expect(itemRepository.save).toHaveBeenCalledWith(createItemDto);
    });
  });

  describe('findAll', () => {
    const mockedItems = [mockedItem__OLD];

    it('should return an array of items using the item repository', async () => {
      jest.spyOn(itemRepository, 'find').mockResolvedValue(mockedItems);

      const items = await service.findAll();

      expect(items).toEqual(mockedItems);

      expect(itemRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a item using the item repository', async () => {
      jest
        .spyOn(itemRepository, 'findOneBy')
        .mockResolvedValue(mockedItem__OLD);

      const item = await service.findOne(mockedItem__OLD.id);

      expect(item).toEqual(mockedItem__OLD);

      expect(itemRepository.findOneBy).toHaveBeenCalledWith({
        id: mockedItem__OLD.id,
      });
    });
  });

  describe('update', () => {
    const updateItemDto = {
      name: 'Troll',
    };

    describe('when the item exists', () => {
      it('should update the item using the item repository', async () => {
        jest
          .spyOn(itemRepository, 'findOneBy')
          .mockResolvedValue(mockedItem__OLD);

        await service.update(mockedItem__OLD.id, updateItemDto);

        expect(itemRepository.findOneBy).toHaveBeenCalledWith({
          id: mockedItem__OLD.id,
        });

        expect(itemRepository.save).toHaveBeenCalledWith({
          ...mockedItem__OLD,
          ...updateItemDto,
        });
      });
    });

    describe('when the item does not exist', () => {
      it('should return null', async () => {
        jest.spyOn(itemRepository, 'findOneBy').mockResolvedValue(null);

        const item = await service.update(mockedItem__OLD.id, updateItemDto);

        expect(item).toEqual(null);
        expect(itemRepository.findOneBy).toHaveBeenCalledWith({
          id: mockedItem__OLD.id,
        });
      });
    });
  });

  describe('delete', () => {
    it('should delete item using the item repository', async () => {
      jest
        .spyOn(itemRepository, 'findOneBy')
        .mockResolvedValue(mockedItem__OLD);

      await service.delete(mockedItem__OLD.id);

      expect(itemRepository.delete).toHaveBeenCalledWith(mockedItem__OLD.id);
    });
  });
});
