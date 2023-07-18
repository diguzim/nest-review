import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto, UpdateItemDto } from './dto';
import { AuthenticatedRequest } from '../auth/auth.controller';
import { Public } from '../decorators';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Body() createItemDto: CreateItemDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.itemsService.create(createItemDto, req.user);
  }

  @Get()
  @Public()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    const item = await this.itemsService.findOne(+id);

    if (!item) {
      throw new NotFoundException();
    }

    return item;
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    const item = await this.itemsService.update(+id, updateItemDto);

    if (!item) {
      throw new NotFoundException();
    }

    return item;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const items = await this.itemsService.delete(+id);

    if (items.affected === 0) {
      throw new NotFoundException();
    }

    return 'Succesfully deleted';
  }
}
