import {Model, Table, Column, DataType, BelongsToMany} from "sequelize-typescript"
import {ApiProperty} from '@nestjs/swagger'
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttrs {
    value: string,
    description: string
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {

    @ApiProperty({example: 'laundryResponsible', description: 'Роль пользователя'})
    @Column({type: DataType.STRING, unique: true, allowNull: false, defaultValue: 'Пользователь'})
    value: string;

    @ApiProperty({example: 'Ответственный за стиральную комнату', description: 'Описание роли'})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @BelongsToMany(() => User, () => UserRoles)
    users: User[];

}