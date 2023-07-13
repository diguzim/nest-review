import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreaturesService } from './creatures.service';
import { CreateCreatureDto, UpdateCreatureDto } from './dto';

@Controller('creatures')
export class CreaturesController {
  constructor(private readonly creaturesService: CreaturesService) {}

  @Post()
  async create(@Body() createCreatureDto: CreateCreatureDto) {
    return this.creaturesService.create(createCreatureDto);
  }

  @Get()
  async findAll() {
    return this.creaturesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.creaturesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateCreatureDto: UpdateCreatureDto,
  ) {
    return this.creaturesService.update(id, updateCreatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.creaturesService.delete(id);
  }
}
