import {Model, Table, Column, DataType, ForeignKey, BelongsTo} from "sequelize-typescript"
import { User } from "src/users/users.model";
import { Wm } from "src/wms/entities/wm.entity";

interface WmEntryCreationAttrs {
    title: string,
    userId: number;
    wmValue: number;
    description: string,
    from: Date,
    to: Date,
}

@Table({tableName: 'wm-entries'})
export class WmEntry extends Model<WmEntry, WmEntryCreationAttrs> {
    
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    status: "closed" | "passed" | "booked" | "empty";

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number | null;

    @ForeignKey(() => Wm)
    @Column({type: DataType.INTEGER})
    wmId: number;

    @Column({type: DataType.STRING, allowNull: false})
    time: string;

    @Column({type: DataType.STRING, allowNull: false})
    date: string;

    @BelongsTo(() => User)
    userInfo: User

    @BelongsTo(() => Wm)
    wmInfo: Wm
}