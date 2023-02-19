import {Model, Table, Column, DataType, ForeignKey, BelongsTo} from "sequelize-typescript"
import {ApiProperty} from '@nestjs/swagger'
import { User } from "src/users/users.model";

interface RoomCreationAttrs {
    title: string,
    description: string,
    responsibleId: number
}

@Table({tableName: 'rooms'})
export class Room extends Model<Room, RoomCreationAttrs> {
    
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'laundry', description: 'Кодовое название комнаты для упрощения взаимодействия'})
    @Column({type: DataType.STRING, allowNull: false})
    value: string;

    @ApiProperty({example: 'Стиральная комната', description: 'Название комнаты'})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @ApiProperty({example: 'Это комната, в которой можно стирать вещи.', description: 'Описание комнаты'})
    @Column({type: DataType.STRING})
    description: string;

    @ApiProperty({example: '123', description: 'ID ответственного за комнату'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    responsibleId: number;   

    @BelongsTo(() => User)
    responsible: User
}
