import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { envs } from 'src/config';

@Injectable()
export class PaymentsService {
  // Instanciando a Stripe
  private readonly stripe = new Stripe(envs.stripeSecretKey);

  async createPaymentSession() {
    const session = await this.stripe.checkout.sessions.create({
      payment_intent_data: {
        metadata: {},
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-Shirt',
            },
            unit_amount: 2000, // 20 dólares
          },
          quantity: 2,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3003/payments/success',
      cancel_url: 'http://localhost:3003/payments/cancel',
    });
    return session;
  }
}
