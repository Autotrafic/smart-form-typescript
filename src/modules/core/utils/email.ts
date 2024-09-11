import emailjs from 'emailjs-com';
import { IOrder } from '../interfaces/order';
import { AUTOTRAFIC_EMAIL } from './constants';
import { VehicleType } from '@modules/vehicle-form/interfaces/enums';
import { UPLOAD_DOCUMENTS_URL } from './urls';

export function sendConfirmationOrderEmail(orderData: IOrder) {
  const { type, brand, model } = orderData.vehicleForm.vehicle;
  const { orderId } = orderData;

  const templateParams = {
    customer_name: orderData.billData.fullName,
    vehicle: `${type === VehicleType.CAR ? brand + '  ' + model.modelName : 'Moto'}`,
    order_cost: orderData.prices.totalPrice,
    uploadDocumentsUrl: `${UPLOAD_DOCUMENTS_URL}/${orderId}`,
    user_email: `${orderData.billData.email}, ${AUTOTRAFIC_EMAIL}`,
  };

  emailjs.send('service_5lr8jdc', 'template_se2isto', templateParams, 'p4ieMe8wklkzdu-TK').then(
    (response) => {
      console.log('SUCCESS!', response.status, response.text);
    },
    (err) => {
      console.log('FAILED...', err);
    }
  );
}
