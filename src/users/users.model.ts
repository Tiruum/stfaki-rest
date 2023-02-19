import {Model, Table, Column, DataType, BelongsToMany} from "sequelize-typescript"
import {ApiProperty} from '@nestjs/swagger'
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs {
    email: string,
    password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'ivanov.ii@phystech.edu', description: 'Почта в домене @phygitstech.edu'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: '12345', description: 'Пароль пользователя'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'false', description: 'Забанен пользователь или нет'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'Описание', description: 'Причина бана'})
    @Column({type: DataType.STRING})
    banReason: string;

    // @Column({type:, unique:, primaryKey:})
    // banTimeout: number

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]
}
