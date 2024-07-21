import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { OrderModule } from 'src/order/order.module';
import { StripeModule } from 'src/stripe/stripe.module';
import { UserModule } from '@user/user.module';

@Module({
  imports: [OrderModule, StripeModule, UserModule],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class CheckoutModule {}
