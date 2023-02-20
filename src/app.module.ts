import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { EntriesModule } from './entries/entries.module';
import { RoomsModule } from './rooms/rooms.module';
import { Room } from "./rooms/entities/room.entity";
import { Entry } from "./entries/entities/entry.entity";
import { WmEntriesModule } from './wm-entries/wm-entries.module';
import { WmEntry } from "./wm-entries/entities/wm-entry.entity";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.PG_HOST,
            port: Number(process.env.PG_PORT),
            username: process.env.PG_USERNAME,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DB,
            models: [User, Role, UserRoles, Room, Entry, WmEntry],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        EntriesModule,
        RoomsModule,
        WmEntriesModule,
    ]
})
export class AppModule {}