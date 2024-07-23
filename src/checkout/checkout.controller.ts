// src/checkout/checkout.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { OrderService } from '../order/order.service';
import { StripeService } from '../stripe/stripe.service';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';
import { CreateOrderDto } from '../order/dto/create-order.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('checkout')
@Controller('checkout')
export class CheckoutController {
  constructor(
    private readonly checkoutService: CheckoutService,
    private readonly ordersService: OrderService,
    private readonly stripeService: StripeService
  ) {}

  @Post('process-order')
  @ApiOperation({ summary: 'Create a new checkout' })
  @ApiBody({ type: CreateCheckoutSessionDto })
  @ApiResponse({ status: 201, description: 'Checkout created successfully' })
  async create(@Body() createCheckoutSessionDto: CreateCheckoutSessionDto) {
    return this.checkoutService.createOrderAndCheckoutSession(createCheckoutSessionDto);
  }
}
