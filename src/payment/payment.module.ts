import { Module, forwardRef } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [
    forwardRef(() => AuthModule)
  ]
})
export class PaymentModule {}