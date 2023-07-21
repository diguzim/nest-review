import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DropsService } from './drops.service';
import { CreateDropDto } from './dto/create-drop.dto';

@Controller('drops')
export class DropsController {
  constructor(private readonly dropsService: DropsService) {}

  @Post()
  create(@Body() createDropDto: CreateDropDto) {
    return this.dropsService.create(createDropDto);
  }

  @Get()
  findAll() {
    return this.dropsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dropsService.findOne(+id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.dropsService.delete(+id);
  }
}
