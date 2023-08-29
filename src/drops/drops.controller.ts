import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { DropsService } from './drops.service';
import { CreateDropDto } from './dto/create-drop.dto';
import { Public } from '../decorators';
import { UpdateDropDto } from './dto/update-drop.dto';

@Controller('drops')
export class DropsController {
  constructor(private readonly dropsService: DropsService) {}

  @Post()
  async create(@Body() createDropDto: CreateDropDto) {
    const result = await this.dropsService.create(createDropDto);

    if (result instanceof Error) {
      throw result;
    }

    return result;
  }

  @Get()
  @Public()
  findAll() {
    return this.dropsService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.dropsService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDropDto: UpdateDropDto) {
    const result = await this.dropsService.update(+id, updateDropDto);

    if (result instanceof Error) {
      throw result;
    }

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.dropsService.delete(+id);
  }
}
