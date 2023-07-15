import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Entry } from './entities/entry.entity';
import { UsersService } from 'src/users/users.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { Op } from 'sequelize';
import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/users/users.model';

@Injectable()
export class EntriesService {

  constructor(@InjectModel(Entry) private entryRepository: typeof Entry,
              private usersService: UsersService,
              private roomsService: RoomsService) {}

  async create(createEntryDto: CreateEntryDto) {
    const entry = this.entryRepository.create(createEntryDto);
    const user = await this.usersService.getUserById(createEntryDto.userId);
    const room = await this.roomsService.findByValue(createEntryDto.roomValue);
    if (user && room) {
      (await entry).$set('userInfo', user.id);
      (await entry).userInfo = user;
      (await entry).$set('roomInfo', room.id);
      (await entry).roomInfo = room;
      return entry;
    } else {
      throw new HttpException("Такого пользователя или комнаты не найдено", HttpStatus.NOT_FOUND)
    }
  }

  async findAll(): Promise<Entry[]> {
    const entries = await this.entryRepository.findAll({include: {all: true}});
    return entries;
  }

  async findOne(id: number): Promise<Entry> {
    const entry = await this.entryRepository.findOne({where: {id}, include: {all: true}});
    return entry;
  }

  async findByParams(room: string, fromDate: string, toDate: string): Promise<Entry[]> {
    const fD = new Date(fromDate)
    const tD = new Date(toDate)
    const entries = await this.entryRepository.findAll({
      where: {
        [Op.and]: {
          from: {
            [Op.between]: [fD, tD]
          },
          to: {
            [Op.between]: [fD, tD]
          },
        },
      },
      include: [{model: Room, where: {value: room}}, {all: true}],
    });
    return entries;
  }

  async update(id: number, updateEntryDto: UpdateEntryDto) {
    const entry = await this.entryRepository.update({...updateEntryDto}, {where: {id}, returning: true})
  }

  async remove(id: number) {
    const entry = await this.entryRepository.destroy({where: {id}})
  }
  
}
