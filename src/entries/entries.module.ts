import { Module, forwardRef } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Room } from 'src/rooms/entities/room.entity';
import { UsersModule } from 'src/users/users.module';
import { RoomsModule } from 'src/rooms/rooms.module';
import { Entry } from './entities/entry.entity';

@Module({
  controllers: [EntriesController],
  providers: [EntriesService],
  imports: [
    SequelizeModule.forFeature([User, Room, Entry]),
    forwardRef(() => UsersModule),
    forwardRef(() => RoomsModule)
  ],
  exports: [
    
  ]
})
export class EntriesModule {}
