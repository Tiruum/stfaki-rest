import { Module, forwardRef } from '@nestjs/common';
import { WmEntriesService } from './wm-entries.service';
import { WmEntriesController } from './wm-entries.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { WmEntry } from './entities/wm-entry.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [WmEntriesController],
  providers: [WmEntriesService],
  imports: [
    SequelizeModule.forFeature([User, WmEntry]),
    forwardRef(() => UsersModule),
  ],
  exports: [
    WmEntriesService
  ]
})
export class WmEntriesModule {}