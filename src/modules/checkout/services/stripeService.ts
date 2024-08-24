import { StripeUserData } from '../interfaces';
import { autotraficApi } from '@modules/core/utils/request';

export const createPaymentIntent = async (amount: number, userData: StripeUserData) => {
  return autotraficApi.payment.createIntent({ amount, userData });
};
