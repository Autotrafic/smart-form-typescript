import { StripeUserData } from '../interfaces';
import { autotraficApi } from '@modules/core/services';

export const createPaymentIntent = async (amount: number, userData: StripeUserData) => {
  return autotraficApi.payment.createIntent({ amount, userData });
};
