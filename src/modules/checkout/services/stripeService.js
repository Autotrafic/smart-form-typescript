import { BASE_API_URL } from "../../../utils/constants";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const createPaymentIntent = async (amount, userData) => {
  return fetch(`${BASE_API_URL}/payment/create-intent`, {
    headers,
    method: "post",
    body: JSON.stringify({
      amount,
      userData,
    }),
  })
    .then((res) => res.json())
    .catch(console.error);
};
