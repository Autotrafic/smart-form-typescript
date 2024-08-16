import {
  IRequestBodyCarFuels,
  IRequestBodyCarModels,
  IRequestBodyCalculateITP,
  IRequestBodyRegisterOrder,
} from '../interfaces/export';
import { BASE_API_URL } from './urls';

export const request = {
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
  },
};

const makeRequest = async (
  endpoint: string,
  data?: IRequestBodyCarFuels | IRequestBodyCarModels | IRequestBodyCalculateITP | IRequestBodyRegisterOrder
) => {
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

export const apiRequest = async (endpoint: string, data, method = 'GET') => {
  const response = await fetch(`${BASE_API_URL}/${endpoint}`, {
    method: method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data && JSON.stringify({ ...data }),
  });

  const result = await response.json();

  if (result) return result;
};

export const apiLogsRequest = async (endpoint: string, data, method = 'GET') => {
  const response = await fetch(`${BASE_API_URL}/logs/${endpoint}`, {
    method: method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data && JSON.stringify({ ...data }),
  });

  const result = await response.json();

  return result;
};
