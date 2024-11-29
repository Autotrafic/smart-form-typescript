import { StripeUserData } from '../interfaces';
import { autotraficApi } from '@modules/core/services';

export const createPaymentIntent = async (amount: number, userData: StripeUserData) => {
  const response = await autotraficApi.payment.createIntent({ amount, userData });

  return response.clientSecret;
};
