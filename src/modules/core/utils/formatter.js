export function formatFuelToRedeable(fuel) {
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
  }
}

export function processPhoneNumber(phoneNumber) {
  if (!phoneNumber) return;

  const parts = phoneNumber.split(' ');
  parts.shift();
  const processedNumber = parts.join('');
  const finalNumber = processedNumber.substring(0, 11);

  return finalNumber;
}

export function formatToFullDate(originalDate) {
  let parts = originalDate.split("/");

  if (parts[0].length === 2 && parts[1].length === 2) {
    return originalDate;
  } else {
    let transformedDate =
      parts[0].padStart(2, "0") + "/" + parts[1].padStart(2, "0") + "/" + parts[2];
    return transformedDate;
  }
}

export function getVehicleRedeableNameFromOrderData(orderData) {
  let simpleName = '';

  if (orderData?.vehicleType === 1 && orderData?.brand && orderData?.model?.modelName) {
    const firstModelNameWord = orderData?.model?.modelName.split(' ')[0];
    simpleName = `un ${orderData.brand} ${firstModelNameWord} del ${orderData?.date?.year}`;
  } else if (orderData?.vehicleType === 2) {
    simpleName = `una moto del ${orderData?.date?.year}`;
  }

  return simpleName;
}