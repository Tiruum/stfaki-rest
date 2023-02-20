import {Model, Table, Column, DataType, BelongsToMany, ForeignKey} from "sequelize-typescript"
import {ApiProperty} from '@nestjs/swagger'
import { User } from "src/users/users.model";
import { Room } from "src/rooms/entities/room.entity";

interface EntryCreationAttrs {
    title: string,
    description: string,
    from: Date,
    to: Date,
}

@Table({tableName: 'entries'})
export class Entry extends Model<Entry, EntryCreationAttrs> {
    
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(() => Room)
    @Column({type: DataType.INTEGER})
    roomId: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.STRING})
    description: string;

    @Column({type: DataType.DATE, defaultValue: false})
    from: Date;

    @Column({type: DataType.STRING})
    to: Date;

    @Column({type: DataType.STRING, defaultValue: 'one-time'})
    type: string;

    // @BelongsToMany(() => Role, () => UserRoles)
    // roles: Role[]
}
