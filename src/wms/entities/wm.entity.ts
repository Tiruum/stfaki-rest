import {Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany} from "sequelize-typescript"
import { WmEntry } from "src/wm-entries/entities/wm-entry.entity";

interface WmCreationAttrs {
    value: number;
    price: number;
    isActive: boolean;
}

@Table({tableName: 'wms'})
export class Wm extends Model<Wm, WmCreationAttrs> {
    
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    value: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    price: number;

    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: true})
    isActive: boolean;

    @HasMany(() => WmEntry)
    wmEntries: WmEntry[]
}
