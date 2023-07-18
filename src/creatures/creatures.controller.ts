import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  Request,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { CreaturesService } from './creatures.service';
import { CreateCreatureDto, UpdateCreatureDto } from './dto';
import { Public } from '../decorators';
import { AuthenticatedRequest } from '../auth/auth.controller';

@Controller('creatures')
export class CreaturesController {
  constructor(private readonly creaturesService: CreaturesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() createCreatureDto: CreateCreatureDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.creaturesService.create(createCreatureDto, req.user);
  }

  @Get()
  @Public()
  async findAll() {
    return this.creaturesService.findAll();
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const creature = await this.creaturesService.findOne(id);

    if (!creature) {
      throw new NotFoundException();
    }

    return creature;
  }

  @Patch(':id')
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
