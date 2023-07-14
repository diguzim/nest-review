import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
    const creature = await this.creaturesService.findOne(id);

    if (!creature) {
      throw new NotFoundException();
    }

    return creature;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCreatureDto: UpdateCreatureDto,
  ) {
    const creature = await this.creaturesService.update(id, updateCreatureDto);

    if (!creature) {
      throw new NotFoundException();
    }

    return creature;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const creature = await this.creaturesService.delete(id);

    if (creature.affected === 0) {
      throw new NotFoundException();
    }

    return 'Successfully deleted';
  }
}
