import { TRANSFERENCE_CAR_PRICE, TRANSFERENCE_CICLOMOTOR_PRICE } from '@modules/core/utils/constants';
import { checkIsCiclomotor } from '@modules/core/utils/functions';

const extractMinCc = (ccText) => {
  if (ccText.startsWith('Hasta')) {
    return 0;
  } else if (ccText.includes('superior')) {
    return Infinity;
  } else {
    let number = ccText
      .match(/[\d.,]+/)[0]
      .replace(/\./g, '')
      .replace(',', '.');
    return parseFloat(number);
  }
};

const extractMaxCc = (ccText) => {
  if (ccText.startsWith('Hasta')) {
    return parseFloat(
      ccText
        .match(/[\d.,]+/)[0]
        .replace(/\./g, '')
        .replace(',', '.')
    );
  } else if (ccText.includes('superior')) {
    return Infinity;
  } else {
    let numbers = ccText.match(/[\d.,]+/g);
    let maxNumber = numbers[numbers.length - 1].replace(/\./g, '').replace(',', '.');
    return parseFloat(maxNumber);
  }
};

// export function processCarModelsForOptionsInput(carModels) {
//   const processedModels = carModels.map((model) => )
//   return 
// }

export function extractModelNameFromCarModel(carModel) {
  const objCarModel = JSON.stringify(carModel);
  return objCarModel.modelName;
}

export const sortDisplacements = (arr) => {
  const sortedDisplacements = arr.sort((a, b) => {
    let minCcA = extractMinCc(a.cc);
    let minCcB = extractMinCc(b.cc);
    if (minCcA === minCcB) {
      let maxCcA = extractMaxCc(a.cc);
      let maxCcB = extractMaxCc(b.cc);
      return maxCcA - maxCcB;
    }
    return minCcA - minCcB;
  });

  return sortedDisplacements;
};

export function countPropertiesWithValue(formData) {
  const { date, vehicle, buyerCommunity, phoneNumber } = formData;

  const isDataFilled = {
    date: date.day && date.month && date.year,
    brand: vehicle.brand,
    fuel: vehicle.fuel,
    model: vehicle.model.modelName,
    buyerCommunity: buyerCommunity,
    phoneNumber: phoneNumber,
  };

  return Object.values(isDataFilled).filter((value) => value && value).length;
}

const getTransferenceBasePrice = (vehicleData) => {
  let transferenceBasePrice;
  const isVehicleCiclomotor = checkIsCiclomotor(vehicleData);

  if (isVehicleCiclomotor) {
    transferenceBasePrice = TRANSFERENCE_CICLOMOTOR_PRICE;
  } else {
    transferenceBasePrice = TRANSFERENCE_CAR_PRICE;
  }

  return transferenceBasePrice;
};

function getFeeForHighTicketOrder(itp) {
  return itp > 200 ? itp * 0.02 : 0;
}

export const getPrices = (itpPrice = 0, vehicleData, isReferralValid) => {
  const basePrice = +getTransferenceBasePrice(vehicleData);
  const highTicketOrderFee = getFeeForHighTicketOrder(itpPrice);
  const referralDiscount = isReferralValid ? 10 : 0;

  const totalPrice = +(basePrice + itpPrice + highTicketOrderFee - referralDiscount).toFixed(2);

  return { basePrice, totalPrice, highTicketOrderFee, referralDiscount };
};

export function getFirstTouchWhatsappMessage(extras, isReferralValid) {
  return `
  🚗 ¿Quieres hacer el cambio de nombre de ${extras}?

  *👨🏻‍⚖️ Puedes hacer todo el proceso por WhatsApp con ayuda de un gestor*

  🚀 Te explico cómo funcionamos en Gestoría AutoTrafic

  El trámite se realiza de forma 100% online y con un proceso muy simple:

  1) Debes mandarnos foto de los documentos del vehículo 

  2) Te enviamos el permiso provisional

  3) En 1/2 semanas te llegará el nuevo permiso de circulación a tu domicilio✅
  ${
    isReferralValid
      ? `
    🎁 Por venir de *HistorialVhículo*, ¡ahora tienes 10€ de descuento!`
      : ''
  }
  `;
}
