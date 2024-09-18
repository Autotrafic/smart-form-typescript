import { IOrder } from '@modules/core/interfaces/order';
import { createWhatsAppConfirmationMessage } from '../utils/funcs';
import { autotraficApi } from '@modules/core/utils/request';

export async function sendWhatsAppConfirmation(orderData: IOrder) {
  const message = createWhatsAppConfirmationMessage(orderData);

  const phoneNumber = orderData.vehicleForm.phoneNumber.replace(/\D/g, '');

  await autotraficApi.notification.send({ phoneNumber, message });
}
