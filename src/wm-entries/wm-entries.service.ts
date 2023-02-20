import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateWmEntryDto } from './dto/create-wm-entry.dto';
import { UpdateWmEntryDto } from './dto/update-wm-entry.dto';
import { InjectModel } from '@nestjs/sequelize';
import { WmEntry } from './entities/wm-entry.entity';
import { UsersService } from 'src/users/users.service';
import { WmsService } from 'src/wms/wms.service';

@Injectable()
export class WmEntriesService {

  constructor(@InjectModel(WmEntry) private wmEntryRepository: typeof WmEntry,
              private usersService: UsersService,
              private wmsService: WmsService) {}

  async create(createWmEntryDto: CreateWmEntryDto) {
    const wmEntry = await this.wmEntryRepository.create(createWmEntryDto)
    console.log(createWmEntryDto);
    
    if (createWmEntryDto.userId != null) {
      const user = await this.usersService.getUserById(createWmEntryDto.userId);
      const wm = await this.wmsService.findByValue(createWmEntryDto.wmValue)
      if (user && wm) {
        wmEntry.$set('userInfo', user.id);
        wmEntry.userInfo = user;
        wmEntry.$set('wmInfo', wm.id);
        wmEntry.wmInfo = wm;
        return wmEntry
      } else {
        throw new HttpException("Пользователя с таким ID не найдено", HttpStatus.NOT_FOUND)
      }
    }
  }

  async findAll(): Promise<WmEntry[]> {
    const wmEntry = await this.wmEntryRepository.findAll({include: {all: true}});
    return wmEntry;
  }

  async findById(id: number): Promise<WmEntry> {
    const wmEntry = await this.wmEntryRepository.findOne({where: {id}, include: {all: true}});
    return wmEntry;
  }

  async update(id: number, updateWmEntryDto: UpdateWmEntryDto): Promise<WmEntry> {
    const wmEntry = await this.wmEntryRepository.update({...updateWmEntryDto}, {where: {id}, returning: true})
    return wmEntry[0][0]
  }

  async remove(id: number): Promise<number> {
    const wmEntry = await this.wmEntryRepository.destroy({where: {id}})
    return wmEntry
  }
}
