import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Room } from './entities/room.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RoomsService {

  constructor(@InjectModel(Room) private roomRepository: typeof Room,
                                private userService: UsersService) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const room = await this.roomRepository.create(createRoomDto);
    const user = await this.userService.getUserById(createRoomDto.responsibleId)
    await room.$set('responsible', user.id)
    room.responsible = user
    return room;
  }

  async findAll(): Promise<Room[]> {
    const rooms = await this.roomRepository.findAll({include: {all: true}});
    return rooms
  }

  async findByValue(value: string): Promise<Room> {
    const room = await this.roomRepository.findOne({where: {value}, include: {all: true}});
    return room;
  }

  async findById(id: number): Promise<Room> {
    const room = await this.roomRepository.findOne({where: {id}, include: {all: true}});
    return room;
  }

  async update(value: string, updateRoomDto: UpdateRoomDto) {
    const room = await this.roomRepository.update({...updateRoomDto}, {where: {value}, returning: true})
    return room
  }

  async remove(id: number) {
    const room = await this.roomRepository.destroy({where: {id}})
    return room
  }
}
