import { IOrder } from '@modules/core/interfaces/order';
import { VehicleType } from '@modules/vehicle-form/interfaces/enums';
import emailjs from 'emailjs-com';

export const sendSummaryEmail = (orderData: IOrder) => {
  const { vehicleForm, prices } = orderData;
  const { vehicle } = vehicleForm;

  const templateParams = {
    vehicle_type: VehicleType.CAR,
    vehicle: ``,
    date: `${vehicleForm.date.day}/${vehicleForm.date.month}/${vehicleForm.date.year}`,
    fuel: ``,
    cilinders: '',
    base_price: prices.basePrice,
    itp: orderData.itp.ITP,
    total_price: prices.totalPrice,
    buyer_community: `${vehicleForm.buyerCommunity}`,
    phone_number: `${vehicleForm.phoneNumber}`,
  };

  const sendEmail = (params: typeof templateParams) => {
    emailjs.send('service_wfn5pwq', 'template_5edqhid', params, 'KlThHuwvIjg13ds4v').then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
      },
      (err) => {
        console.log('FAILED...', err);
      }
    );
  };

  if (vehicle.type === VehicleType.CAR) {
    const carParams = {
      ...templateParams,
      vehicle_type: vehicle.type,
      vehicle: `${vehicle.brand} ${vehicle.model.modelName}`,
      fuel: `Fuel: ${vehicle.fuel}`,
    };

    sendEmail(carParams);
  } else if (vehicle.type === VehicleType.MOTORBIKE) {
    const motorbikeParams = {
      ...templateParams,
      vehicle_type: vehicle.type,
      cilinders: `${vehicle.cc}`,
    };

    sendEmail(motorbikeParams);
  }
};
