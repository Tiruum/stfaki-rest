import { Module, forwardRef } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { AuthModule } from 'src/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { Payment } from './payment.model';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [
    SequelizeModule.forFeature([Payment, User]),
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule)
  ],
  exports: [
    PaymentService,
  ]
})
export class PaymentModule {}