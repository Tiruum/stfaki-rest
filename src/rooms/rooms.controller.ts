import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Комнаты')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':value')
  findByValue(@Param('value') value: string) {
    return this.roomsService.findByValue(value);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.roomsService.findById(+id);
  }

  @Patch(':value')
  update(@Param('value') value: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(value, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }
}
