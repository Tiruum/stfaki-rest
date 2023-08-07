import { Injectable } from '@nestjs/common';
import { CreateWmDto } from './dto/create-wm.dto';
import { UpdateWmDto } from './dto/update-wm.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Wm } from './entities/wm.entity';
import { type } from 'os';

@Injectable()
export class WmsService {

  constructor(@InjectModel(Wm) private wmRepository: typeof Wm) {}

  async create(createWmDto: CreateWmDto) {
    const wm = await this.wmRepository.create(createWmDto);
    return wm;
  }

  async findAll(): Promise<Wm[]> {
    const wms = await this.wmRepository.findAll();
    return wms;
  }

  async findByValue(dorm: string, value: number) {
    const wms = await this.wmRepository.findOne({where: {dorm, value}});
    return wms;
  }

  async update(dorm: string, value: number, updateWmDto: UpdateWmDto): Promise<Wm> {
    const wm = await this.wmRepository.update({...updateWmDto}, {where: {dorm, value}, returning: true})
    return wm[0][0];
  }

  async remove(dorm: string, value: number) {
    const wm = await this.wmRepository.destroy({where: {dorm, value}})
    return wm
  }
}
