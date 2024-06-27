// src/stripe/stripe.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('STRIPE_API_KEY');
    console.log('Stripe API Key:', apiKey); // Debugging line
    this.stripe = new Stripe(apiKey, {
      apiVersion: "2024-06-20",
    });
  }


  async createPaymentIntent(amount: number, currency: string): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.create({
      amount,
      currency,
    });
  }
}
