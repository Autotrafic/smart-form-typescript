import IUpdateOrderNestedPropertiesBody from '@modules/documents/interfaces/export/order';
import {
  IRequestBodyCarFuels,
  IRequestBodyCarModels,
  IRequestBodyCalculateITP,
  IRequestBodyRegisterOrder,
} from '@modules/vehicle-form/interfaces/export';
import { BASE_API_URL } from './urls';

export const autotraficApi = {
  vehicle: {
    calculateItp: (data: IRequestBodyCalculateITP) => makeRequest('vehicles/itp', data),
    brands: () => makeRequest('vehicles/brands'),
    fuels: (data: IRequestBodyCarFuels) => makeRequest('vehicles/fuels', data),
    models: (data: IRequestBodyCarModels) => makeRequest('vehicles/models', data),
    fuelCCs: () => makeRequest('vehicles/fuel-ccs'),
    electricCCs: () => makeRequest('vehicles/electric-ccs'),
  },
  order: {
    register: (data: IRequestBodyRegisterOrder) => makeRequest('order/register', data),
    update: (orderId: string, data: IUpdateOrderNestedPropertiesBody) => makeRequest(`order/nested/${orderId}`, data),
  },
};

type RequestParams =
  | IRequestBodyCarFuels
  | IRequestBodyCarModels
  | IRequestBodyCalculateITP
  | IRequestBodyRegisterOrder
  | IUpdateOrderNestedPropertiesBody;

const makeRequest = async (endpoint: string, data?: RequestParams) => {
  const response = await fetch(`${BASE_API_URL}/${endpoint}`, {
    method: data ? 'POST' : 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify({ ...data }) : null,
  });

  const result = await response.json();

  if (result) return result;
};
