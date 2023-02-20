import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WmEntriesService } from './wm-entries.service';
import { CreateWmEntryDto } from './dto/create-wm-entry.dto';
import { UpdateWmEntryDto } from './dto/update-wm-entry.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WmEntry } from './entities/wm-entry.entity';

@ApiTags("Записи стиральной комнаты")
@Controller('wm-entries')
export class WmEntriesController {
  constructor(private readonly wmEntriesService: WmEntriesService) {}

  @ApiOperation({summary: 'Создание записи'})
  @ApiResponse({status: 200, type: WmEntry})
  @Post()
  create(@Body() createWmEntryDto: CreateWmEntryDto) {
    return this.wmEntriesService.create(createWmEntryDto);
  }

  @ApiOperation({summary: 'Получение всех записей'})
  @ApiResponse({status: 200, type: [WmEntry]})
  @Get()
  findAll() {
    return this.wmEntriesService.findAll();
  }

  @ApiOperation({summary: 'Получение записи по Id'})
  @ApiResponse({status: 200, type: WmEntry})
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.wmEntriesService.findById(+id);
  }

  @ApiOperation({summary: 'Изменение записи'})
  @ApiResponse({status: 200, type: WmEntry})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWmEntryDto: UpdateWmEntryDto) {
    return this.wmEntriesService.update(+id, updateWmEntryDto);
  }

  @ApiOperation({summary: 'Удаление записи'})
  @ApiResponse({status: 200})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wmEntriesService.remove(+id);
  }
}
