import {Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany} from "sequelize-typescript"
import {ApiProperty} from '@nestjs/swagger'
import { User } from "src/users/users.model";
import { Entry } from "src/entries/entities/entry.entity";

interface RoomCreationAttrs {
    title: string,
    description: string,
    responsibleId: number
}

@Table({tableName: 'rooms'})
export class Room extends Model<Room, RoomCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    value: string;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.STRING})
    description: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    responsibleId: number;   

    @BelongsTo(() => User)
    responsible: User

    @HasMany(() => Entry)
    entries: Entry[]
    
}
