import { AUTOTRAFIC_EMAIL } from '../../core/utils/constants';
const emailjs = require('emailjs-com');

export default function sendLaterDocumentsEmail(orderData) {
  const customerName = orderData?.billData?.fullName ?? 'Cliente';
  const vehicleType = orderData?.vehicleForm?.vehicleType;
  const vehicleBrand = orderData?.vehicleForm?.brand ?? 'Marca';
  const vehicleModelName = orderData?.vehicleForm?.model?.modelName ?? 'Modelo';
  const vehicle = vehicleType === 1 ? `${vehicleBrand} ${vehicleModelName}` : 'Vehiculo';
  const orderCost = orderData?.prices?.totalPrice ?? 'N/A';
  const userEmail = `${orderData?.billData?.email ?? 'ejemplo@autotrafic.es'}, ${AUTOTRAFIC_EMAIL}`;

  const templateParams = {
    customer_name: customerName,
    vehicle: vehicle,
    order_cost: orderCost,
    user_email: userEmail,
  };

  emailjs.send('service_5lr8jdc', 'template_07tnfew', templateParams, 'p4ieMe8wklkzdu-TK').then(
    (response) => {
      console.log('SUCCESS!', response.status, response.text);
    },
    (err) => {
      console.log('FAILED...', err);
    }
  );
}
