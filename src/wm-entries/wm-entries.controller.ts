import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WmEntriesService } from './wm-entries.service';
import { CreateWmEntryDto } from './dto/create-wm-entry.dto';
import { UpdateWmEntryDto } from './dto/update-wm-entry.dto';

@Controller('wm-entries')
export class WmEntriesController {
  constructor(private readonly wmEntriesService: WmEntriesService) {}

  @Post()
  create(@Body() createWmEntryDto: CreateWmEntryDto) {
    return this.wmEntriesService.create(createWmEntryDto);
  }

  @Get()
  findAll() {
    return this.wmEntriesService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.wmEntriesService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWmEntryDto: UpdateWmEntryDto) {
    return this.wmEntriesService.update(+id, updateWmEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wmEntriesService.remove(+id);
  }
}
