import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MakePaymentDto } from './dto/makePayment.dto';
import axios from 'axios';
import { Payment } from './payment.model';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';
import { CreatePaymentDto } from './dto/createPayment.dto';
import { PaymentStatusDto } from './dto/paymentStatus.dto';
import * as YooKassa from 'yookassa'
import { UpdatePaymentDto } from './dto/updatePayment.dto';

const yooKassa = new YooKassa({
    shopId: '237040',
    secretKey: 'test_ctxZrgtSsZuMSwFSdkLsw9OZylAa3YHkfy_ySYx_FEU'
})

@Injectable()
export class PaymentService {
    constructor(@InjectModel(Payment) private paymentRepository: typeof Payment,
                                    private userService: UsersService) {}
    
    async makePayment(makePaymentDto: MakePaymentDto) {
        try {
            const paymentId = `${new Date().getTime()}${Math.floor(Math.random()*100000)}`
            const payment = await yooKassa.createPayment({
                amount: {
                    value: makePaymentDto.amount,
                    currency: 'RUB',
                },
                capture: true,
                confirmation: {
                    type: 'redirect',
                    return_url: `${process.env.BASE_FRONT_URL}/paymentresponse?paymentId=${paymentId}`
                },
                description: 'Тестовая оплата',
                metadata: {
                    metaId: paymentId
                }
            });
            if (!!payment) {
                this.create({localId: paymentId, yookassaId: payment.id as string, isChecked: false, amount: Number(makePaymentDto.amount), userId: makePaymentDto.userId})
            }
            return payment
        } catch (error) {
            throw new ForbiddenException(error)
        }
    }
    async getPayment(id: string) {
        try {
            const payment = await yooKassa.getPayment(id)
            return payment
        } catch (error) {
            throw new ForbiddenException(error)
        }
    }
    async getAllPayments() {
        try {
            const { data } = await axios({
                method: 'GET',
                url: `https://api.yookassa.ru/v3/payments/`,
                auth: {
                    username: process.env.YOOKASSA_SHOP_ID,
                    password: process.env.YOOKASSA_SHOP_SECRET
                },
            })
            return data
        } catch (error) {
            throw new ForbiddenException(error)
        }
    }

    async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
        const found = await this.findById(createPaymentDto.localId)
        if (!!found) throw new HttpException("Платеж с таким localId уже существует", HttpStatus.BAD_REQUEST);
        const payment = await this.paymentRepository.create(createPaymentDto)
        const user = await this.userService.getUserById(createPaymentDto.userId)
        await payment.$set('userInfo', user.id)
        payment.userInfo = user
        return payment;
    }

    async findAll(): Promise<Payment[]> {
        const payments = await this.paymentRepository.findAll({include: {all: true}});
        return payments
    }

    async findById(localId: string): Promise<Payment> {
        const payment = await this.paymentRepository.findOne({where: {localId}, include: {all: true}});
        return payment;
    }

    async update(localId: string, updatePaymentDto: UpdatePaymentDto) {
        const foundedPayment = await this.findById(localId)
        const payment = await this.paymentRepository.update({...foundedPayment, ...updatePaymentDto}, {where: {localId}, returning: true})
        return payment
    }

    async paymentStatus(paymentStatusDto: PaymentStatusDto) {
        if (paymentStatusDto.event !== 'payment.waiting_for_capture') return
        console.log(paymentStatusDto)

        const payment = await yooKassa.capturePayment(paymentStatusDto.object.id)
        return payment
    }

    async checkPayment(localId: string) {
        const localPayment = await this.findById(localId)
        if (localPayment.isChecked === true) return new HttpException(`Платеж уже обработан`, HttpStatus.BAD_REQUEST);
        const yooKassaPayment = await this.getPayment(localPayment.yookassaId)
        if (yooKassaPayment.status === "succeeded") {
            this.update(localId, {isChecked: true})
            const user = await this.userService.getUserById(localPayment.userId)
            const updatedUser = await this.userService.update(localPayment.userId, {balance: Number(user.balance) + Number(localPayment.amount)})
            return new HttpException(updatedUser[1][0], HttpStatus.OK);
        } else {
            return new HttpException(`Статус платежа ${yooKassaPayment.status}`, HttpStatus.CONTINUE);
        }
    }

}