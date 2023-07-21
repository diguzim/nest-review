import { Injectable } from '@nestjs/common';
import { CreateDropDto } from './dto/create-drop.dto';

@Injectable()
export class DropsService {
  create(createDropDto: CreateDropDto) {
    return 'This action adds a new drop';
  }

  findAll() {
    return `This action returns all drops`;
  }

  findOne(id: number) {
    return `This action returns a #${id} drop`;
  }

  delete(id: number) {
    return `This action deletes a #${id} drop`;
  }
}
