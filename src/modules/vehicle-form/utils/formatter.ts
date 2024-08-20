export function sortBrandsAlphabetically(arr) {
  return arr.sort((a, b) => {
    if (a.brandName < b.brandName) {
      return -1;
    }
    if (a.brandName > b.brandName) {
      return 1;
    }
    return 0;
  });
}

export function sortModelsAlphabetically(arr) {
  return arr.sort((a, b) => {
    if (a.modelName < b.modelName) {
      return -1;
    }
    if (a.modelName > b.modelName) {
      return 1;
    }
    return 0;
  });
}

export function formatSubmitDataForItp(orderData) {
  const { vehicleType, registrationDate, buyerCommunity, cc, model } = orderData;

  const parsedVehicleModel = model ? model : null;

  const ccMotorbike = cc ? extractDataFromCC(cc) : null;
  const vehicleCC = ccMotorbike?.cc ?? model?.cc;

  const vehicleValue = vehicleType === 1 ? parsedVehicleModel?.value : ccMotorbike?.vehicleValue;

  const formattedData = {
    tipoVehiculo: vehicleType,
    fechaMatriculacion: registrationDate,
    comunidadAutonoma: buyerCommunity,
    valorVehiculo: vehicleValue ?? 0,
    potenciaFiscal: convertStringToNumber(parsedVehicleModel?.cvf),
    cilindrada: vehicleCC,
  };

  return formattedData;
}

function convertStringToNumber(str: string) {
  if (!str) return null;

  const normalizedStr = str.replace(',', '.');
  return parseFloat(normalizedStr);
}

export function parseStringifiedToOriginal(value: object | number | string) {
  const isValueStringCC = typeof value === 'string' && value[0] === '{';
  if (isValueStringCC) {
    const parsedValue = JSON.parse(value);
    return parsedValue;
  }

  return value;
}

function extractDataFromCC(ccObject) {
  const name = ccObject.cc;
  const regex = /[\d,.]+/g;
  const matches = name.match(regex);

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

    return { cc: number, vehicleValue: ccObject.value };
  }

  return null;
}

export function processVehicleFormSubmit(vehicleFormData) {
  const processedData = vehicleFormData;
  delete processedData.vehicleTermsAccepted;
  if (vehicleFormData?.model)
    processedData.model =
      typeof vehicleFormData.model === 'string' ? JSON.parse(vehicleFormData.model) : vehicleFormData.model;
  if (vehicleFormData?.cc)
    processedData.cc = typeof vehicleFormData.cc === 'string' ? JSON.parse(vehicleFormData.cc) : vehicleFormData.cc;

  return processedData;
}
