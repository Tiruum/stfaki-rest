import { Module, forwardRef } from '@nestjs/common';
import { WmEntriesService } from './wm-entries.service';
import { WmEntriesController } from './wm-entries.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { WmEntry } from './entities/wm-entry.entity';
import { UsersModule } from 'src/users/users.module';
import { Wm } from 'src/wms/entities/wm.entity';
import { WmsModule } from 'src/wms/wms.module';

@Module({
  controllers: [WmEntriesController],
  providers: [WmEntriesService],
  imports: [
    SequelizeModule.forFeature([User, WmEntry, Wm]),
    forwardRef(() => UsersModule),
    forwardRef(() => WmsModule)
  ],
  exports: [
    WmEntriesService
  ]
})
export class WmEntriesModule {}