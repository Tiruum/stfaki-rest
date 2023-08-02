import {Model, Table, Column, DataType, BelongsToMany, HasMany, HasOne, BelongsTo, ForeignKey} from "sequelize-typescript"
import { User } from "src/users/users.model";

interface PaymentCreationAttrs {
    id: string,
    userId: number,
    amount: number,
}

@Table({tableName: 'payments'})
export class Payment extends Model<Payment, PaymentCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true})
    id: number;
    
    @Column({type: DataType.STRING, unique: true, allowNull: false, primaryKey: true})
    localId: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    yookassaId: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    amount: number;

    @Column({type: DataType.BOOLEAN, unique: false, allowNull: false, defaultValue: false})
    isChecked: Boolean;

    @BelongsTo(() => User)
    userInfo: User

}