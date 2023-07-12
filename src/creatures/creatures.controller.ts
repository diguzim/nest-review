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

@Controller('creatures')
export class CreaturesController {
  @Post()
  async create(@Body() createCreatureDto: CreateCreatureDto): Promise<string> {
    return 'This action adds a new creature';
  }

  @Get()
  async findAll(): Promise<string> {
    return 'This action returns all creatures';
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<string> {
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
