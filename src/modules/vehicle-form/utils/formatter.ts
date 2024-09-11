import { ICarBrand, ICarModel } from '../interfaces/import';
import { VehicleType } from '../interfaces/enums';
import { IVehicleFormData } from '../interfaces';
import { IRequestBodyCalculateITP } from '../interfaces/export';
import { MotorbikeCCRange } from '../interfaces/import/enums';

export function sortBrandsAlphabetically(brands: ICarBrand[]): ICarBrand[] {
  return brands.sort((a, b) => {
    if (a.brandName < b.brandName) {
      return -1;
    }
    if (a.brandName > b.brandName) {
      return 1;
    }
    return 0;
  });
}

export function sortModelsAlphabetically(models: ICarModel[]): ICarModel[] {
  return models.sort((a, b) => {
    if (a.modelName < b.modelName) {
      return -1;
    }
    if (a.modelName > b.modelName) {
      return 1;
    }
    return 0;
  });
}

export function formatSubmitDataForItp(formData: IVehicleFormData): IRequestBodyCalculateITP {
  const { vehicle, registrationDate, buyerCommunity } = formData;
  const { type, model: carModel, cc, value } = vehicle;

  console.log(vehicle);

  let vehicleCC: number = 0;
  let vehicleValue: number = 0;

  if (type === VehicleType.CAR) {
    vehicleCC = carModel.cc;
    vehicleValue = carModel.value;
  } else {
    const ccMotorbike = extractDataFromCC(cc, value);
    vehicleCC = ccMotorbike.cc;
    vehicleValue = ccMotorbike.vehicleValue;
  }

  const formattedData = {
    tipoVehiculo: type,
    fechaMatriculacion: registrationDate,
    comunidadAutonoma: buyerCommunity,
    valorVehiculo: vehicleValue ?? 0,
    potenciaFiscal: convertStringToNumber(carModel.cvf ?? ''),
    cilindrada: vehicleCC,
  };

  return formattedData;
}

function convertStringToNumber(str: string): number | null {
  if (!str) return null;

  const normalizedStr = str.replace(',', '.');
  return parseFloat(normalizedStr);
}

export function parseStringVehicleDataToObject(value: string): string | object {
  const isStringVehicleData = typeof value === 'string' && value[0] === '{';
  if (isStringVehicleData) {
    const parsedValue = JSON.parse(value);
    return parsedValue;
  }

  return value;
}

function extractDataFromCC(ccString: MotorbikeCCRange, vehicleValue: number): { cc: number; vehicleValue: number } {
  const regex = /[\d,.]+/g;
  const matches = ccString.match(regex);

  if (matches) {
    const numbers = matches.map((match) => {
      if (match.includes(',') && match.includes('.')) {
        if (match.lastIndexOf(',') > match.lastIndexOf('.')) {
          return match.replace(/\./g, '').replace(',', '.');
        } else {
          return match.replace(/,/g, '');
        }
      } else if (match.includes(',')) {
        return match.replace(',', '.');
      } else {
        return match.replace(/\./g, '');
      }
    });

    const floats = numbers.map((num) => parseFloat(num));
    const number = floats.sort((a, b) => a - b)[0];

    return { cc: number, vehicleValue };
  }

  return { cc: -1, vehicleValue };
}
