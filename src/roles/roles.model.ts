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

    @Column({type: DataType.STRING, unique: true, allowNull: false, defaultValue: 'Пользователь'})
    value: string;

    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @BelongsToMany(() => User, () => UserRoles)
    users: User[];

}