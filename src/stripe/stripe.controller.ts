// src/stripe/stripe.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ApiBody, ApiResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('stripe')
@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() body: { amount: number; currency: string }) {
    return this.stripeService.createPaymentIntent(body.amount, body.currency);
  }
}
