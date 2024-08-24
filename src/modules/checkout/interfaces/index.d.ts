import * as stripeJs from '@stripe/stripe-js';

export interface StripeUserData {
  fullName: string;
  email: string;
  phoneNumber: string;
}

type StripeCvcEvent = stripeJs.StripeFpxBankElementChangeEvent | any;
type StripeElementEvent =
  | stripeJs.StripeCardExpiryElementChangeEvent
  | stripeJs.StripeCardNumberElementChangeEvent
  | StripeCvcEvent;

type StripeCardNumberElement = stripeJs.StripeCardNumberElement;

interface CardChecks {
  cardExpiry: boolean;
  cardNumber: boolean;
  cardCvc: boolean;
}
