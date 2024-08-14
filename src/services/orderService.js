import { apiRequest } from "../utils/request";

export const registerOrder = async (orderData) => {
  await apiRequest("order/register", { ...orderData }, "POST");
};

export const updateNestedOrder = async (orderId, newData) => {
  await apiRequest(`order/nested/${orderId}`, { ...newData }, "PUT");
};
