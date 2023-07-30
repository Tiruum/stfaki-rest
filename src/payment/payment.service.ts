import { ForbiddenException, Injectable } from '@nestjs/common';
import { MakePaymentDto } from './dto/makePayment.dto';
import axios from 'axios';

@Injectable()
export class PaymentService {
    async makePayment(makePaymentDto: MakePaymentDto) {
        try {
            const idempotenceKey = makePaymentDto.idempotenceKey || Date.now()+Math.floor(Math.random()*1000)
            console.log(idempotenceKey)
            const paymentId = `${new Date().getTime()}${Math.floor(Math.random()*100000)}`
            const { data } = await axios({
                method: 'POST',
                url: 'https://api.yookassa.ru/v3/payments',
                headers: {
                    "Content-Type": "application/json",
                    "Idempotence-Key": idempotenceKey,
                },
                auth: {
                    username: process.env.YOOKASSA_SHOP_ID,
                    password: process.env.YOOKASSA_SHOP_SECRET
                },
                data: {
                    id: paymentId,
                    amount: {
                        value: makePaymentDto.amount,
                        currency: 'RUB',
                    },
                    capture: true,
                    confirmation: {
                        type: 'redirect',
                        return_url: `http://localhost:3000/paymentresponse?paymentId=${paymentId}`
                    },
                    description: 'Тестовая оплата',
                    metadata: {
                        metaId: paymentId
                    }
               }
            });

            return data;
        } catch (error) {
            throw new ForbiddenException(error)
        }
    }
    async getPayment(id: string) {
        try {
            const { data } = await axios({
                method: 'GET',
                url: `https://api.yookassa.ru/v3/payments/${id}`,
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

}
