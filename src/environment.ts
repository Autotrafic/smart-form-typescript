export const isProduction = true;

const liveStripeKey =
  'pk_live_51OAXtLJa5DLxJFBC7aB2X6WUKjNNJo24CrqewKWtBArD07qq4e72w84fBhew0cF2KC3uvvJz2DQZufq3KTzIEGne000knW0qAA';
const testStripeKey =
  'pk_test_51OAXtLJa5DLxJFBCYB0nOmpL6NPG79GXYY1bfM0lqXA9F4Nbi7ptxd0MMIn6RdaMRi2L3qcNwDIFbNq8NKvqgD4Y002injPrP5';

const prodApiUrl = 'https://api.autotrafic.es';
const localApiUrl = 'http://localhost:3100';

export const stripeKey = isProduction ? liveStripeKey : testStripeKey;

export const BASE_API_URL = isProduction ? prodApiUrl : localApiUrl;
