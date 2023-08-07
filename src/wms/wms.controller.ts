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

  @Get(':dorm_value')
  findByValue(@Param('dorm_value') dorm_value: string) {
    const [dorm, value] = dorm_value.split('_')
    return this.wmsService.findByValue(dorm, +value);
  }

  @Patch(':dorm_value')
  update(@Param('dorm_value') dorm_value: string, @Body() updateWmDto: UpdateWmDto) {
    const [dorm, value] = dorm_value.split('_')
    return this.wmsService.update(dorm, +value, updateWmDto);
  }

  @Delete(':dorm_value')
  remove(@Param('dorm_value') dorm_value: string) {
    const [dorm, value] = dorm_value.split('_')
    return this.wmsService.remove(dorm, +value);
  }
}
