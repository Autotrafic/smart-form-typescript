import {
  IRequestBodyCarFuels,
  IRequestBodyCarModels,
  IRequestBodyCalculateITP,
  IRequestBodyRegisterOrder,
  CreateIntentRequestBody,
  CreateTotalumOrderBody,
  SendNotificationBody,
  SendWhatsAppNotificationBody,
} from '@modules/vehicle-form/interfaces/export';
import { BASE_API_URL, WHATSAPP_API_URL } from '@modules/core/utils/urls';

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
    createTotalum: (orderId: CreateTotalumOrderBody) => makeRequest('order/totalum/create', orderId),
  },
  payment: {
    createIntent: (data: CreateIntentRequestBody) => makeRequest('payment/create-intent', data),
  },
  notification: {
    sendWhatsapp: (data: SendWhatsAppNotificationBody) => makeWhatsappRequest('messages/send', data),
    sendWhatsappFirstTouch: (data: SendWhatsAppNotificationBody) => makeWhatsappRequest('messages/first-touch-whtspp', data),
    sendSlack: (data: SendNotificationBody) => makeRequest('messages/slack', data),
  },
};

type RequestParams =
  | CreateTotalumOrderBody
  | IRequestBodyCarFuels
  | IRequestBodyCarModels
  | IRequestBodyCalculateITP
  | IRequestBodyRegisterOrder
  | IUpdateOrderNestedPropertiesBody
  | CreateIntentRequestBody
  | SendWhatsAppNotificationBody
  | SendNotificationBody;

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

const makeWhatsappRequest = async (endpoint: string, data?: SendWhatsAppNotificationBody) => {
  const response = await fetch(`${WHATSAPP_API_URL}/${endpoint}`, {
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