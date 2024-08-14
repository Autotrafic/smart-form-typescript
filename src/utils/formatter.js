import { autonomousCommunities } from "./constants";
import { compressFile } from "./functions";

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

export function formatFuelToRedeable(fuel) {
  switch (fuel) {
    case "G":
      return "Gasolina";
    case "D":
      return "Diesel";
    case "S":
      return "Gasolina GLP";
    case "M":
      return "Etanol+Gasolina o Bio";
    case "Elc":
      return "Eléctrico";
    case "H":
      return "Hidrógeno";
    case "GyE":
      return "Híbrido Gasolina Eléctrico";
    case "DyE":
      return "Híbrido Diésel Eléctrico";
  }
}

const extractMinCc = (ccText) => {
  if (ccText.startsWith("Hasta")) {
    return 0;
  } else if (ccText.includes("superior")) {
    return Infinity;
  } else {
    let number = ccText
      .match(/[\d.,]+/)[0]
      .replace(/\./g, "")
      .replace(",", ".");
    return parseFloat(number);
  }
};

const extractMaxCc = (ccText) => {
  if (ccText.startsWith("Hasta")) {
    return parseFloat(
      ccText
        .match(/[\d.,]+/)[0]
        .replace(/\./g, "")
        .replace(",", ".")
    );
  } else if (ccText.includes("superior")) {
    return Infinity;
  } else {
    let numbers = ccText.match(/[\d.,]+/g);
    let maxNumber = numbers[numbers.length - 1].replace(/\./g, "").replace(",", ".");
    return parseFloat(maxNumber);
  }
};

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

export function processPhoneNumber(phoneNumber) {
  if (!phoneNumber) return;

  const parts = phoneNumber.split(" ");
  parts.shift();
  const processedNumber = parts.join("");
  const finalNumber = processedNumber.substring(0, 11);

  return finalNumber;
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

function convertStringToNumber(str) {
  if (!str) return null;

  const normalizedStr = str.replace(",", ".");
  return parseFloat(normalizedStr);
}

function extractDataFromCC(ccObject) {
  const name = ccObject.cc;
  const regex = /[\d,.]+/g;
  const matches = name.match(regex);

  if (matches) {
    const numbers = matches.map((match) => {
      if (match.includes(",") && match.includes(".")) {
        if (match.lastIndexOf(",") > match.lastIndexOf(".")) {
          return match.replace(/\./g, "").replace(",", ".");
        } else {
          return match.replace(/,/g, "");
        }
      } else if (match.includes(",")) {
        return match.replace(",", ".");
      } else {
        return match.replace(/\./g, "");
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
      typeof vehicleFormData.model === "string"
        ? JSON.parse(vehicleFormData.model)
        : vehicleFormData.model;
  if (vehicleFormData?.cc)
    processedData.cc =
      typeof vehicleFormData.cc === "string" ? JSON.parse(vehicleFormData.cc) : vehicleFormData.cc;

  return processedData;
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

export function processInputFile(file, newName) {
  const extensionIndex = file.name.lastIndexOf(".");
  const extension = file.name.substring(extensionIndex);

  const newFileName = newName + extension;

  const renamedFile = new File([file], newFileName, { type: file.type });

  return renamedFile;
}

export async function processFilesForSubmit(files) {
  const {
    dniBackSeller,
    dniFrontalSeller,
    dniBackBuyer,
    dniFrontalBuyer,
    contratoCompr,
    fichaTecnica,
    permisoCirculacion,
  } = files;

  const processedFiles = [
    dniBackSeller,
    dniFrontalSeller,
    dniBackBuyer,
    dniFrontalBuyer,
    contratoCompr,
    fichaTecnica,
    permisoCirculacion,
  ];

  const compressedFilesPromise = processedFiles.map((file) => compressFile(file));
  const compressedFiles = await Promise.all(compressedFilesPromise);

  return compressedFiles;
}

export function processOrderDataForSubmit(orderData) {
  const { vehicleForm, billData, itp, prices, documents, crossSelling } = orderData;

  const vehicle = {
    plate: documents?.vehiclePlate,
    vehicleType: vehicleForm?.vehicleType,
    brand: vehicleForm?.brand,
    model: vehicleForm?.model?.modelName,
    registrationDate: vehicleForm?.registrationDate,
  };

  const buyer = {
    phoneNumber: documents?.buyerPhone,
  };

  const seller = {
    phoneNumber: documents?.sellerPhone,
  };

  const customer = {
    community: getCommunityName(vehicleForm?.buyerCommunity),
    phoneNumber: vehicleForm?.phoneNumber,
    fullName: billData?.fullName,
    email: billData?.email,
  };

  const plusServices = {
    etiquetaMedioambiental: crossSelling?.etiquetaMedioambiental,
    informeDgt: crossSelling?.informeDgt,
  };

  const order = {
    shippingAddress: documents?.shippingAdress,
    postalCode: documents?.postalCode,
    itpPrice: itp?.ITP,
    totalPrice: +prices?.totalPrice,
  };

  return { vehicle, buyer, seller, customer, plusServices, order };
}

function getCommunityName(communityCode) {
  if (!communityCode) return;

  const lookup = {};
  autonomousCommunities.forEach((region) => {
    lookup[region.value] = region.name;
  });

  return lookup[communityCode] || "Code not found";
}
