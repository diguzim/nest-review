import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreaturesService } from './creatures.service';
import { CreateCreatureDto, UpdateCreatureDto } from './dto';

@Controller('creatures')
export class CreaturesController {
  constructor(private readonly creaturesService: CreaturesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createCreatureDto: CreateCreatureDto) {
    return this.creaturesService.create(createCreatureDto);
  }

  @Get()
  async findAll() {
    return this.creaturesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const creature = await this.creaturesService.findOne(id);

    if (!creature) {
      throw new NotFoundException();
    }

    return creature;
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCreatureDto: UpdateCreatureDto,
  ) {
    const creature = await this.creaturesService.update(id, updateCreatureDto);

    if (!creature) {
      throw new NotFoundException();
    }

    return creature;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const creature = await this.creaturesService.delete(id);

    if (creature.affected === 0) {
      throw new NotFoundException();
    }

    return 'Successfully deleted';
  }
}
