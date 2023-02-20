import { Module, forwardRef } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Room } from './entities/room.entity';
import { User } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { Entry } from 'src/entries/entities/entry.entity';
import { EntriesModule } from 'src/entries/entries.module';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  imports: [
    SequelizeModule.forFeature([Room, User, Entry]),
    forwardRef(() => UsersModule),
  ],
  exports: [
    RoomsService
  ]
})
export class RoomsModule {}
