import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MakePaymentDto } from './dto/makePayment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePaymentDto } from './dto/createPayment.dto';
import { PaymentStatusDto } from './dto/paymentStatus.dto';

@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService) {}

    @ApiOperation({summary: 'Создание платежа в yookassa'})
    @ApiResponse({status: 200, type: 'YookassaBody'})
    // @UseGuards(JwtAuthGuard)
    @Post('/yoo')
    async makePayment(@Body() makePaymentDto: MakePaymentDto) {
        return this.paymentService.makePayment(makePaymentDto)
    }

    @ApiOperation({summary: 'Получение платежа по ID'})
    @ApiResponse({status: 200, type: 'YookassaBody'})
    // @UseGuards(JwtAuthGuard)
    @Get('/yoo/:id')
    async getPayment(@Param('id') id: string) {
        return this.paymentService.getPayment(id)
    }

    @Get('/yoo')
    async getAllPayments() {
        return this.paymentService.getAllPayments()
    }

    @ApiOperation({summary: 'Создание платежа в локальной базе данных'})
    @ApiResponse({status: 200, type: 'LocalPaymentBody'})
    // @UseGuards(JwtAuthGuard)
    @Post('/local')
    async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
        return this.paymentService.create(createPaymentDto)
    }

    @Get('/local/')
    async getLocalPayments() {
        return this.paymentService.findAll()
    }

    @Post('/localstatus')
    async checkPayment(@Body() payload: {id: string}) {
        return this.paymentService.checkPayment(payload.id)
    }

    @Get('/local/:id')
    async getLocalPayment(@Param('id') id: string) {
        return this.paymentService.findById(id)
    }

    @ApiOperation({summary: 'Изменение платежа по локальному ID'})
    @ApiResponse({status: 200})
    @Patch('/local/:id')
    async update(@Param('id') id: string, @Body() updatePaymentDto: CreatePaymentDto) {
        return this.paymentService.update(id, updatePaymentDto);
    }

    @Post('/notification')
    async handleNotification(@Body() payload: {type: string, event: string, object: {id: string, status: string, amount: {value: string, currency: string}}}) {
        return this.paymentService.handleNotification(payload)
    }


}
