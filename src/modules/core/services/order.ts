import { IRequestBodyRegisterOrder } from "../interfaces/export";
import { IOrder } from "../interfaces/order";
import { parseOrderForRequest } from "../utils/formatter";
import { apiRequest, request } from "../utils/request";

export const registerOrder = async (order: IOrder) => {
  const parsedOrder: IRequestBodyRegisterOrder = parseOrderForRequest(order);
  
  await request.order.register(parsedOrder);
};

export const updateNestedOrder = async (orderId, newData) => {
  await apiRequest(`order/nested/${orderId}`, { ...newData }, "PUT");
};
