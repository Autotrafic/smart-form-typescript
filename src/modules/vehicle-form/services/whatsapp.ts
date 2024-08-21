import axios from 'axios';
import { getVehicleRedeableNameFromFormData } from '@modules/core/utils/formatter';
import { getFirstTouchWhatsappMessage } from '../utils/functions';
import { IVehicleFormData } from '../interfaces';

export const sendFirstTouchMessage = async (
  receiverPhoneNumber: string,
  formData: IVehicleFormData,
  isReferralValid: boolean
) => {
  const formattedPhoneNumber = receiverPhoneNumber.replace(/\D/g, '');

  const vehicleRedeableName = getVehicleRedeableNameFromFormData(formData);
  const message = getFirstTouchWhatsappMessage(vehicleRedeableName, isReferralValid);

  const data = { phoneNumber: formattedPhoneNumber, message };

  await axios.post('https://autotrafic-whatsapp-d396136eabe5.herokuapp.com/messages/first-touch-whtspp', data);
};
