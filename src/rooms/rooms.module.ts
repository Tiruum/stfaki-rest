import { Module, forwardRef } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Room } from './entities/room.entity';
import { User } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  imports: [
    SequelizeModule.forFeature([Room, User]),
    forwardRef(() => UsersModule)
  ],
  exports: [
    RoomsService
  ]
})
export class RoomsModule {}
