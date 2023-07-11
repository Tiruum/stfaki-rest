import {Model, Table, Column, DataType, BelongsToMany, HasMany} from "sequelize-typescript"
import { Entry } from "src/entries/entities/entry.entity";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";
import { Room } from "src/rooms/entities/room.entity";
import { WmEntry } from "src/wm-entries/entities/wm-entry.entity";

interface UserCreationAttrs {
    email: string,
    password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    username: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
    balance: number;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @Column({type: DataType.STRING})
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @HasMany(() => Room)
    rooms: Room[]

    @HasMany(() => Entry)
    entries: Entry[]

    @HasMany(() => WmEntry)
    wmEntries: WmEntry[]

}