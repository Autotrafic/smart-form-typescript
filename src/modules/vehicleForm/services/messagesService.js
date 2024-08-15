import axios from "axios";
import {
  getFirstTouchWhatsappMessage,
  getVehicleRedeableNameFromOrderData,
} from "../../../utils/functions";

export const sendFirstTouchMessage = async (receiverPhoneNumber, formData, isReferralValid) => {
  const formattedPhoneNumber = receiverPhoneNumber.replace(/\D/g, "");

  const vehicleRedeableName = getVehicleRedeableNameFromOrderData(formData);
  const message = getFirstTouchWhatsappMessage(vehicleRedeableName, isReferralValid);

  const data = { phoneNumber: formattedPhoneNumber, message };

  await axios.post(
    "https://autotrafic-whatsapp-d396136eabe5.herokuapp.com/messages/first-touch-whtspp",
    data
  );
};
