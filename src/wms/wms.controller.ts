import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WmsService } from './wms.service';
import { CreateWmDto } from './dto/create-wm.dto';
import { UpdateWmDto } from './dto/update-wm.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Стиральные машины")
@Controller('wms')
export class WmsController {
  constructor(private readonly wmsService: WmsService) {}

  @Post()
  create(@Body() createWmDto: CreateWmDto) {
    return this.wmsService.create(createWmDto);
  }

  @Get()
  findAll() {
    return this.wmsService.findAll();
  }

  @Get(':value')
  findByValue(@Param('value') value: number) {
    return this.wmsService.findByValue(value);
  }

  @Patch(':value')
  update(@Param('value') value: string, @Body() updateWmDto: UpdateWmDto) {
    return this.wmsService.update(+value, updateWmDto);
  }

  @Delete(':value')
  remove(@Param('value') value: string) {
    return this.wmsService.remove(+value);
  }
}
