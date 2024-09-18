import { IRequestBodyRegisterOrder } from '@modules/vehicle-form/interfaces/export';
import { IOrder } from '../interfaces/order';
import { parseOrderForRequest } from '../utils/formatter';
import { autotraficApi } from '@modules/core/services';

export const registerOrder = async (order: IOrder) => {
  const parsedOrder: IRequestBodyRegisterOrder = parseOrderForRequest(order);

  await autotraficApi.order.register(parsedOrder);
};

export const updateNestedOrder = async (orderId: string, newData: IUpdateOrderNestedPropertiesBody) => {
  await autotraficApi.order.update(orderId, newData);
};

export const createTotalumOrder = async (orderId: string) => {
  await autotraficApi.order.createTotalum({ orderId });
};
