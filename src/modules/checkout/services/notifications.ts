import { IOrder } from '@modules/core/interfaces/order';
import { createWhatsAppConfirmationMessage } from '../utils/funcs';
import { autotraficApi } from '@modules/core/services';

export async function sendWhatsAppConfirmation(orderData: IOrder) {
  try {
    const message = createWhatsAppConfirmationMessage(orderData);

  const phoneNumber = orderData.vehicleForm.phoneNumber.replace(/\D/g, '');

  await autotraficApi.notification.sendWhatsapp({ phoneNumber, message });
  } catch (error) {
    const receivedError = error as any;

    await sendSlackNotification(`Error enviando la notificación de pedido realizado. No se frena el trámite. ${receivedError.response}`);
  }
  
}

export async function sendSlackNotification(message: string, channel?: 'orders') {
  await autotraficApi.notification.sendSlack({ message, channel });
}
