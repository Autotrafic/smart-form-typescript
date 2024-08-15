import emailjs from 'emailjs-com';

const sendEmail = (params) => {
  emailjs.send('service_wfn5pwq', 'template_5edqhid', params, 'KlThHuwvIjg13ds4v').then(
    (response) => {
      console.log('SUCCESS!', response.status, response.text);
    },
    (err) => {
      console.log('FAILED...', err);
    }
  );
};

export const sendSummaryEmail = (orderData) => {
  if (!orderData?.vehicleForm?.phoneNumber) return;

  if (orderData.vehicleForm.vehicleType === 1) {
    const templateParams = {
      vehicle_type: orderData.vehicleForm.vehicleType,
      vehicle: `${orderData.vehicleForm.brand} ${orderData.vehicleForm.model.modelName}`,
      date: `${orderData.vehicleForm.date.day}/${orderData.vehicleForm.date.month}/${orderData.vehicleForm.date.year}`,
      fuel: `Fuel: ${orderData.vehicleForm.fuel}`,
      cilinders: '',
      base_price: orderData.prices.basePrice,
      itp: orderData.itp.ITP,
      total_price: orderData.prices.totalPrice,
      buyer_community: `${orderData.vehicleForm.buyerCommunity}`,
      phone_number: `${orderData.vehicleForm.phoneNumber}`,
    };
    sendEmail(templateParams);
  } else if (orderData.vehicleForm.vehicleType === 2) {
    const templateParams = {
      vehicle_type: orderData.vehicleForm.vehicleType,
      vehicle: '',
      date: `${orderData.vehicleForm.date.day}/${orderData.vehicleForm.date.month}/${orderData.vehicleForm.date.year}`,
      fuel: '',
      cilinders: `${orderData.vehicleForm.cc.cc}`,
      base_price: orderData.prices.basePrice,
      itp: orderData.itp.ITP,
      total_price: orderData.prices.totalPrice,
      buyer_community: `${orderData.vehicleForm.buyerCommunity}`,
      phone_number: `${orderData.vehicleForm.phoneNumber}`,
    };

    sendEmail(templateParams);
  }
};
