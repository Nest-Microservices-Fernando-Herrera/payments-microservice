import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { Request, Response } from 'express';
import { envs } from 'src/config';
import { PaymentSessionDto } from './dto/payment-session.dto';

@Injectable()
export class PaymentsService {
  // Instanciando a Stripe
  private readonly stripe = new Stripe(envs.stripeSecretKey);

  // Método para crear una sesión de pago en Stripe
  async createPaymentSession(paymentSessionDto: PaymentSessionDto) {
    // Desestructurando el DTO
    const { currency, items, orderId } = paymentSessionDto;

    // Creamos un array de objetos lineItems para Stripe
    const lineItems = items.map((item) => {
      return {
        price_data: {
          currency: currency,
          product_data: {
            name: item.name,
          },
          // Convertimos el precio a centavos para Stripe (multiplicando por 100)
          unit_amount: Math.round(item.price * 100), // Ejemplo -> 20 dólares 2000 / 100 = 20.00 // 15.0000
        },
        quantity: item.quantity,
      };
    });

    const session = await this.stripe.checkout.sessions.create({
      payment_intent_data: {
        metadata: {
          orderId: orderId,
        },
      },
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3003/payments/success',
      cancel_url: 'http://localhost:3003/payments/cancel',
    });
    return session;
  }

  // Método para poder comunicarnos con el Webhook
  async stripeWebHook(req: Request, res: Response) {
    const sig = req.headers['stripe-signature'];
    console.log({ sig });

    return res.status(200).json({ sig });
  }
}
