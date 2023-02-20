import {Model, Table, Column, DataType, ForeignKey, BelongsTo} from "sequelize-typescript"
import { User } from "src/users/users.model";

interface WmEntryCreationAttrs {
    title: string,
    description: string,
    from: Date,
    to: Date,
}

@Table({tableName: 'wm-entries'})
export class WmEntry extends Model<WmEntry, WmEntryCreationAttrs> {
    
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER, unique: true, allowNull: false})
    value: number;

    @Column({type: DataType.STRING, allowNull: false})
    status: "closed" | "passed" | "booked" | "empty";

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number | null;

    @Column({type: DataType.STRING})
    wmId: number | null;

    @Column({type: DataType.STRING, allowNull: false})
    time: string;

    @Column({type: DataType.STRING, allowNull: false})
    date: string;

    @BelongsTo(() => User)
    userInfo: User
}
