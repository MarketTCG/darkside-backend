// src/stripe/stripe.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('STRIPE_SK');
    console.log('Stripe API Key:', apiKey); // Debugging line
    this.stripe = new Stripe(apiKey, {
      apiVersion: "2024-06-20",
    });
  }

  async getCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session>{
    return this.stripe.checkout.sessions.retrieve(sessionId);
  }


  async createPaymentIntent(amount: number, currency: string): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.create({
      amount,
      currency,
    });
  }

  async createProductAndPrice(name: string, description: string, unitAmount: number, currency: string): Promise<{ productId: string, priceId: string }> {
    const product = await this.stripe.products.create({
      name,
      description,
    });

    const price = await this.stripe.prices.create({
      product: product.id,
      unit_amount: unitAmount,
      currency,
    });

    return { productId: product.id, priceId: price.id };
  }

  async createCheckoutSession(items: { name: string, description: string, unitAmount: number, currency: string, quantity: number }[]): Promise<Stripe.Checkout.Session> {
    const domainURL = this.configService.get<string>('DOMAIN');

    const lineItems = items.map(item => ({
      price_data: {
        currency: item.currency,
        unit_amount: item.unitAmount,
        product_data: {
          name: item.name,
          description: item.description,
        },
      },
      quantity: item.quantity,
    }));

    return this.stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${domainURL}?success=true`,
      cancel_url: `${domainURL}?canceled=true`,
      expires_at: Math.floor(Date.now() / 1000) + (1800) //30min expiry
    });
  }

  async createPrices(items: { productId: string, unitAmount: number, currency: string }[]): Promise<Stripe.Price[]> {
    const prices = [];

    for (const item of items) {
      const price = await this.stripe.prices.create({
        product: item.productId,
        unit_amount: item.unitAmount,
        currency: item.currency,
      });
      prices.push(price);
    }

    return prices;
  }

  async createProducts(items: { name: string, description: string, unitAmount: number, currency: string }[]): Promise<{ productId: string, priceId: string }[]> {
    const products = [];

    for (const item of items) {
      const product = await this.stripe.products.create({
        name: item.name,
        description: item.description,
      });

      const price = await this.stripe.prices.create({
        product: product.id,
        unit_amount: item.unitAmount,
        currency: item.currency,
      });

      products.push({ productId: product.id, priceId: price.id });
    }

    return products;
  }

  async archivePrice(priceId: string): Promise<Stripe.Price> {
    return this.stripe.prices.update(priceId, { active: false });
  }

  constructEvent(payload: Buffer, sig: string, secret: string): Stripe.Event {
    return this.stripe.webhooks.constructEvent(payload, sig, secret);
  }

  async handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
    // Perform actions based on the successful payment
    console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
    // Add your logic here
  }

  async handlePaymentMethodAttached(paymentMethod: Stripe.PaymentMethod) {
    // Perform actions based on the successful attachment of a PaymentMethod
    console.log(`PaymentMethod ${paymentMethod.id} was attached!`);
    // Add your logic here
  }
}
