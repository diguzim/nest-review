import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockedUser } from '../common/test/mocked-entities';

describe('ItemsService', () => {
  let service: ItemsService;
  let itemRepository: Repository<Item>;

  const CREATURE_REPOSITORY_TOKEN = getRepositoryToken(Item);

  const item_id = 1;
  const mockedItem = {
    id: item_id,
    name: 'Orc',
    user: mockedUser,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: CREATURE_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn((item) => item),
            find: jest.fn(),
            findOneBy: jest.fn(),
            delete: jest.fn(),
          },
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
    const createItemDto = { name: mockedItem.name, user: mockedUser };

    it('should save a item using the item repository', async () => {
      await service.create(createItemDto, mockedUser);

      expect(itemRepository.save).toHaveBeenCalledWith(createItemDto);
    });
  });

  describe('findAll', () => {
    const mockedItems = [mockedItem];

    it('should return an array of items using the item repository', async () => {
      jest.spyOn(itemRepository, 'find').mockResolvedValue(mockedItems);

      const items = await service.findAll();

      expect(items).toEqual(mockedItems);

      expect(itemRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a item using the item repository', async () => {
      jest.spyOn(itemRepository, 'findOneBy').mockResolvedValue(mockedItem);

      const item = await service.findOne(item_id);

      expect(item).toEqual(mockedItem);

      expect(itemRepository.findOneBy).toHaveBeenCalledWith({
        id: item_id,
      });
    });
  });

  describe('update', () => {
    const updateItemDto = {
      name: 'Troll',
    };

    describe('when the item exists', () => {
      it('should update the item using the item repository', async () => {
        jest.spyOn(itemRepository, 'findOneBy').mockResolvedValue(mockedItem);

        await service.update(item_id, updateItemDto);

        expect(itemRepository.findOneBy).toHaveBeenCalledWith({
          id: item_id,
        });

        expect(itemRepository.save).toHaveBeenCalledWith({
          ...mockedItem,
          ...updateItemDto,
        });
      });
    });

    describe('when the item does not exist', () => {
      it('should return null', async () => {
        jest.spyOn(itemRepository, 'findOneBy').mockResolvedValue(null);

        const item = await service.update(item_id, updateItemDto);

        expect(item).toEqual(null);
        expect(itemRepository.findOneBy).toHaveBeenCalledWith({
          id: item_id,
        });
      });
    });
  });

  describe('delete', () => {
    it('should delete item using the item repository', async () => {
      jest.spyOn(itemRepository, 'findOneBy').mockResolvedValue(mockedItem);

      await service.delete(item_id);

      expect(itemRepository.delete).toHaveBeenCalledWith(item_id);
    });
  });
});