// src/stripe/stripe.controller.ts
import { Controller, Get, Post, Body, Query, Res, Req, RawBodyRequest } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StripeService } from './stripe.service';
import { ApiBody, ApiResponse, ApiOperation, ApiParam, ApiTags, ApiQuery } from '@nestjs/swagger';
import { GetCheckoutSessionDto } from './dto/get-checkout-session.dto';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';
import { CreatePriceDto } from './dto/create-price-items.dto';
import { CreateProductDto } from './dto/create-products.dto';
import { Response } from 'express';
import { ArchivePriceDto } from './dto/archive-price.dto';
import Stripe from 'stripe';

@ApiTags('stripe')
@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly configService: ConfigService
  ) {}

  @Get('checkout-session')
  @ApiOperation({ summary: 'Retrieve a Stripe checkout session' })
  @ApiQuery({ name: 'sessionId', required: true, description: 'The ID of the checkout session' })
  @ApiResponse({ status: 200, description: 'Checkout session retrieved successfully' })
  async getCheckoutSession(@Query() query: GetCheckoutSessionDto) {
    const { sessionId } = query;
    const session = await this.stripeService.getCheckoutSession(sessionId);
    return session;
  }
  /*
  @Post('create-payment-intent')
  async createPaymentIntent(@Body() body: { amount: number; currency: string }) {
    return this.stripeService.createPaymentIntent(body.amount, body.currency);
  }
    */

  @Post('create-checkout-session')
  @ApiOperation({ summary: 'Create a Stripe checkout session with inline price data' })
  @ApiBody({ type: CreateCheckoutSessionDto })
  @ApiResponse({ status: 201, description: 'Checkout session created successfully' })
  async createCheckoutSession(@Body() createCheckoutSessionDto: CreateCheckoutSessionDto) {
    const session = await this.stripeService.createCheckoutSession(createCheckoutSessionDto.items);
    return { session };
  }

  /** 
  @Post('create-prices')
  @ApiOperation({ summary: 'Create Stripe price objects for each item' })
  @ApiBody({ type: CreatePriceDto })
  @ApiResponse({ status: 201, description: 'Prices created successfully' })
  async createPrices(@Body() createPriceDto: CreatePriceDto) {
    const prices = await this.stripeService.createPrices(createPriceDto.items);
    return { prices };
  }

  @Post('create-products')
  @ApiOperation({ summary: 'Create Stripe products and prices for each item' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Products and prices created successfully' })
  async createProducts(@Body() createProductDto: CreateProductDto) {
    const products = await this.stripeService.createProducts(createProductDto.items);
    return { products };
  }
    

  @Post('archive-price')
  @ApiOperation({ summary: 'Archive a Stripe price' })
  @ApiBody({ type: ArchivePriceDto })
  @ApiResponse({ status: 200, description: 'Price archived successfully' })
  async archivePrice(@Body() archivePriceDto: ArchivePriceDto) {
    const { priceId } = archivePriceDto;
    const price = await this.stripeService.archivePrice(priceId);
    return { price };
  }
    */

  @Post('webhook')
  async handleWebhook(@Req() req: RawBodyRequest<Request>, @Res() res: Response) {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');

    let event: Stripe.Event;

    try {
      
      event = this.stripeService.constructEvent(req.rawBody, sig, endpointSecret);
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object as Stripe.PaymentIntent;
        await this.stripeService.handlePaymentIntentSucceeded(paymentIntentSucceeded);
        break;
      case 'payment_method.attached':
        const paymentMethodAttached = event.data.object as Stripe.PaymentMethod;
        await this.stripeService.handlePaymentMethodAttached(paymentMethodAttached);
        break;
      // need to update other events
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  }
  
}
