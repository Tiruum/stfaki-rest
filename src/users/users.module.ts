 import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from '@nestjs/sequelize'
import { User } from './users.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { Room } from 'src/rooms/entities/room.entity';
import { RoomsModule } from 'src/rooms/rooms.module';
import { Entry } from 'src/entries/entities/entry.entity';
import { EntriesModule } from 'src/entries/entries.module';
import { WmEntry } from 'src/wm-entries/entities/wm-entry.entity';
import { WmEntriesModule } from 'src/wm-entries/wm-entries.module';
import { PaymentModule } from 'src/payment/payment.module';
import { Payment } from 'src/payment/payment.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Room, Entry, WmEntry, Payment]),
    RolesModule,
    forwardRef(() => RoomsModule),
    forwardRef(() => AuthModule),
    forwardRef(() => WmEntriesModule),
    forwardRef(() => PaymentModule),
  ],
  exports: [
    UsersService,
  ]
})
export class UsersModule {}
