import { Module } from '@nestjs/common';
import { WmsService } from './wms.service';
import { WmsController } from './wms.controller';
import { Wm } from './entities/wm.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { WmEntry } from 'src/wm-entries/entities/wm-entry.entity';

@Module({
  controllers: [WmsController],
  providers: [WmsService],
  imports: [
    SequelizeModule.forFeature([Wm, WmEntry])
  ],
  exports: [
    WmsService
  ]
})
export class WmsModule {}
