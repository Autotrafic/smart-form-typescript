import { VehicleType } from '@modules/vehicle-form/interfaces/enums';
import {
  ICarSpecifications,
  IMotorbikeSpecifications,
  IRegisterOrderUser,
  IRequestBodyRegisterOrder,
} from '@modules/vehicle-form/interfaces/export';
import { IOrder } from '../interfaces/order';
import { Fuel } from '@modules/vehicle-form/interfaces/import/enums';
import { IVehicleFormData } from '@modules/vehicle-form/interfaces';

export function formatFuelToRedeable(fuel: Fuel): string {
  switch (fuel) {
    case 'G':
      return 'Gasolina';
    case 'D':
      return 'Diesel';
    case 'S':
      return 'Gasolina GLP';
    case 'M':
      return 'Etanol+Gasolina o Bio';
    case 'Elc':
      return 'Eléctrico';
    case 'H':
      return 'Hidrógeno';
    case 'GyE':
      return 'Híbrido Gasolina Eléctrico';
    case 'DyE':
      return 'Híbrido Diésel Eléctrico';
    default:
      return '';
  }
}

export function processPhoneNumber(phoneNumber: string): string {
  if (!phoneNumber) return '';

  const parts = phoneNumber.split(' ');
  parts.shift();
  const processedNumber = parts.join('');
  const finalNumber = processedNumber.substring(0, 11);

  return finalNumber;
}

export function formatToFullDate(originalDate: `${string}/${string}/${string}`): string {
  let parts = originalDate.split('/');

  if (parts[0].length === 2 && parts[1].length === 2) {
    return originalDate;
  } else {
    let transformedDate = parts[0].padStart(2, '0') + '/' + parts[1].padStart(2, '0') + '/' + parts[2];
    return transformedDate;
  }
}

export function getVehicleRedeableNameFromFormData(formData: IVehicleFormData): string {
  const { type, brand, model } = formData.vehicle;
  let simpleName = '';

  if (type === VehicleType.CAR && brand && model.modelName) {
    const firstModelNameWord = model.modelName.split(' ')[0];
    simpleName = `un ${brand} ${firstModelNameWord} del ${formData?.date?.year}`;
  } else if (type === VehicleType.MOTORBIKE) {
    simpleName = `una moto del ${formData.date.year}`;
  }

  return simpleName;
}

export function parseOrderForRequest(order: IOrder): IRequestBodyRegisterOrder {
  const { orderId, paymentIntentId, isProduction, isReferralValid, itp, prices, crossSelling, billData, vehicleForm } = order;
  const { type, brand, model, cc, value } = vehicleForm.vehicle;

  let vehicle;

  if (type === VehicleType.CAR) {
    vehicle = {
      type,
      registrationDate: vehicleForm.registrationDate,
      brand,
      ...model,
    } as ICarSpecifications;
  } else {
    vehicle = {
      type,
      registrationDate: vehicleForm.registrationDate,
      cc,
      value,
    } as IMotorbikeSpecifications;
  }

  const user: IRegisterOrderUser = {
    fullName: billData.fullName,
    phoneNumber: vehicleForm.phoneNumber,
    email: billData.email,
    buyerCommunity: vehicleForm.buyerCommunity,
  };

  return {
    orderId,
    paymentIntentId,
    isProduction,
    isReferralValid,
    itp,
    prices,
    crossSelling,
    vehicle,
    user,
  };
}
