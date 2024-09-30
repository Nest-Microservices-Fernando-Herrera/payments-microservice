import { Injectable } from '@nestjs/common';
import { envs } from 'src/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  // Instanciando a Stripe
  private readonly stripe = new Stripe(envs.stripeSecretKey);
}
