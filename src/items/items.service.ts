import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  create(createItemDto: CreateItemDto, user: User) {
    const item = new Item();
    item.name = createItemDto.name;
    item.user = user;
    return this.itemsRepository.save(item);
  }

  findAll() {
    return this.itemsRepository.find();
  }

  findOne(id: number) {
    return this.itemsRepository.findOneBy({ id });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    let item = await this.itemsRepository.findOneBy({ id });

    if (!item) {
      return null;
    }

    item.name = updateItemDto.name;
    item = await this.itemsRepository.save(item);
    return item;
  }

  delete(id: number) {
    return this.itemsRepository.delete(id);
  }
}
