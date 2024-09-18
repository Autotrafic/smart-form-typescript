import { TRANSFERENCE_CAR_PRICE, TRANSFERENCE_CICLOMOTOR_PRICE } from '@modules/core/utils/constants';
import { checkIsCiclomotor } from '@modules/core/utils/functions';
import { MotorbikeCCRange } from '../interfaces/import/enums';
import { IMotorbikesResponse } from '../interfaces/import';
import { IVehicleFormData } from '../interfaces';
import { IOrderPrices } from '@modules/core/interfaces/order';

const extractMinCc = (motorbikeCCRange: MotorbikeCCRange): number => {
  if (motorbikeCCRange.startsWith('Hasta')) {
    return 0;
  } else if (motorbikeCCRange.includes('superior')) {
    return Infinity;
  } else {
    const match = motorbikeCCRange.match(/[\d.,]+/);
    if (match) {
      let number = match[0].replace(/\./g, '').replace(',', '.');
      return parseFloat(number);
    } else {
      throw new Error('No valid number found in motorbikeCCRange string');
    }
  }
};

const extractMaxCc = (motorbikeCCRange: MotorbikeCCRange): number => {
  if (motorbikeCCRange.startsWith('Hasta')) {
    const match = motorbikeCCRange.match(/[\d.,]+/);
    if (match) {
      return parseFloat(match[0].replace(/\./g, '').replace(',', '.'));
    } else {
      throw new Error('No valid number found in motorbikeCCRange string');
    }
  } else if (motorbikeCCRange.includes('superior')) {
    return Infinity;
  } else {
    let numbers = motorbikeCCRange.match(/[\d.,]+/g);
    if (numbers && numbers.length > 0) {
      let maxNumber = numbers[numbers.length - 1].replace(/\./g, '').replace(',', '.');
      return parseFloat(maxNumber);
    } else {
      throw new Error('No valid numbers found in motorbikeCCRange string');
    }
  }
};

export const sortDisplacements = (motorbikes: IMotorbikesResponse): IMotorbikesResponse => {
  try {
    const sortedDisplacements = motorbikes.sort((a, b) => {
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
  } catch (error) {
    return motorbikes;
  }
};

export function countPropertiesWithValue(formData: IVehicleFormData): number {
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

const getTransferenceBasePrice = (formData: IVehicleFormData): number => {
  const isVehicleCiclomotor = checkIsCiclomotor(formData);

  if (isVehicleCiclomotor) {
    return TRANSFERENCE_CICLOMOTOR_PRICE;
  } else {
    return TRANSFERENCE_CAR_PRICE;
  }
};

function getFeeForHighTicketOrder(itpValue: number): number {
  return itpValue > 200 ? itpValue * 0.02 : 0;
}

export const getPrices = (itpPrice = 0, formData: IVehicleFormData, isReferralValid: boolean): IOrderPrices => {
  const basePrice = getTransferenceBasePrice(formData);
  const highTicketOrderFee = getFeeForHighTicketOrder(itpPrice);
  const referralDiscount = isReferralValid ? 10 : 0;

  const totalPrice = +(basePrice + itpPrice + highTicketOrderFee - referralDiscount).toFixed(2);

  return { basePrice, totalPrice, highTicketOrderFee, referralDiscount };
};

export function getFirstTouchWhatsappMessage(vehicleDescription: string, isReferralValid: boolean): string {
  return `
🚗 ¿Quieres hacer el cambio de nombre de ${vehicleDescription}?

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
  }`;
}
