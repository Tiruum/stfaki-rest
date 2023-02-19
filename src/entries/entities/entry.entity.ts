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
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '1', description: 'ID пользователя'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ApiProperty({example: '1', description: 'ID комнаты'})
    @ForeignKey(() => Room)
    @Column({type: DataType.INTEGER})
    roomId: number;

    @ApiProperty({example: 'Просмотр фильма', description: 'Название мероприятия'})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @ApiProperty({example: 'Фильм Начало', description: 'Описание мероприятия'})
    @Column({type: DataType.STRING})
    description: string;

    @ApiProperty({example: 'false', description: 'Время начала мероприятия'})
    @Column({type: DataType.DATE, defaultValue: false})
    from: Date;

    @ApiProperty({example: 'Описание', description: 'Время конца мероприятия'})
    @Column({type: DataType.STRING})
    to: Date;

    @ApiProperty({example: 'one-time', description: 'Тип мероприятия (one-time, weekly, monthly)'})
    @Column({type: DataType.STRING, defaultValue: 'one-time'})
    type: string;

    // @BelongsToMany(() => Role, () => UserRoles)
    // roles: Role[]
}
