import IUpdateOrderNestedPropertiesBody from '@modules/documents/interfaces/export/order';
import { IRequestBodyRegisterOrder } from '@modules/vehicle-form/interfaces/export';
import { IOrder } from '../interfaces/order';
import { parseOrderForRequest } from '../utils/formatter';
import { autotraficApi } from '../utils/request';

export const registerOrder = async (order: IOrder) => {
  const parsedOrder: IRequestBodyRegisterOrder = parseOrderForRequest(order);

  await autotraficApi.order.register(parsedOrder);
};

export const updateNestedOrder = async (orderId: string, newData: IUpdateOrderNestedPropertiesBody) => {
  await autotraficApi.order.update(orderId, newData);
};
