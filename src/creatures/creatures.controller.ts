import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCreatureDto, UpdateCreatureDto } from './dto';
import { CreaturesService } from './creatures.service';

@Controller('creatures')
export class CreaturesController {
  constructor(private readonly creaturesService: CreaturesService) {}

  @Post()
  async create(@Body() createCreatureDto: CreateCreatureDto) {
    this.creaturesService.create(createCreatureDto);
  }

  @Get()
  async findAll() {
    this.creaturesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return `This action returns a #${id} creature`;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCreatureDto: UpdateCreatureDto,
  ) {
    return `This action updates a #${id} creature`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} creature`;
  }
}
