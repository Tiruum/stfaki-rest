import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MakePaymentDto } from './dto/makePayment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService) {}

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: 'YookassaBody'})
    // @UseGuards(JwtAuthGuard)
    @Post()
    makePayment(@Body() namePaymentDto: MakePaymentDto) {
        return this.paymentService.makePayment(namePaymentDto)
    }

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: 'YookassaBody'})
    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    getPayment(@Param('id') id: string) {
        return this.paymentService.getPayment(id)
    }

    @Get()
    getAllPayments() {
        return this.paymentService.getAllPayments()
    }
}
