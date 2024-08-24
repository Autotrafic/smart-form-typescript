import { BASE_API_URL } from '@modules/core/utils/urls';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

type UserData = { fullName: string; email: string; phoneNumber: string };

export const createPaymentIntent = async (amount: number, userData: UserData) => {
  return fetch(`${BASE_API_URL}/payment/create-intent`, {
    headers,
    method: 'post',
    body: JSON.stringify({
      amount,
      userData,
    }),
  })
    .then((res) => res.json())
    .catch(console.error);
};
