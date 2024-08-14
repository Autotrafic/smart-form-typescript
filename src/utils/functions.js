import Compressor from "compressorjs";
import {
  CICLOMOTOR_VALUE,
  ELEMENT_TO_SCROLL,
  ELEMENT_TO_SCROLL_ALTERNATIVE,
  ELEMENT_TO_SCROLL_ID,
  TRANSFERENCE_CAR_PRICE,
  TRANSFERENCE_CICLOMOTOR_PRICE,
  autonomousCommunities,
} from "./constants";

export function countPropertiesWithValue(obj) {
  return Object.values(obj).filter((value) => value !== null && value !== undefined).length;
}

export function getCommunityByCode(code) {
  const community = autonomousCommunities.find((c) => c.value === code);
  return community ? community.name : "CCAA";
}

export const checkIsCiclomotor = (vehicleData) => {
  return vehicleData.vehicleType === 2 && vehicleData.cc.value === CICLOMOTOR_VALUE;
};

export const getTransferenceBasePrice = (vehicleData) => {
  let transferenceBasePrice;
  const isVehicleCiclomotor = checkIsCiclomotor(vehicleData);

  if (isVehicleCiclomotor) {
    transferenceBasePrice = TRANSFERENCE_CICLOMOTOR_PRICE;
  } else {
    transferenceBasePrice = TRANSFERENCE_CAR_PRICE;
  }

  return transferenceBasePrice;
};

export const getPrices = (itpPrice = 0, vehicleData, isReferralValid) => {
  const basePrice = +getTransferenceBasePrice(vehicleData);
  const highTicketOrderFee = getFeeForHighTicketOrder(itpPrice);
  const referralDiscount = isReferralValid ? 10 : 0;

  const totalPrice = +(basePrice + itpPrice + highTicketOrderFee - referralDiscount).toFixed(2);

  return { basePrice, totalPrice, highTicketOrderFee, referralDiscount };
};

export async function compressFile(file) {
  if (file.type.startsWith("image/")) {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.6,
        maxWidth: 1024,
        maxHeight: 1024,
        convertSize: 200000,
        success(compressedImage) {
          const resultFile = new File([compressedImage], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
          resolve(resultFile);
        },
        error(err) {
          reject(err);
        },
      });
    });
  } else {
    return file;
  }
}

export function scrollToNextStep() {
  const elementToScroll = document.getElementById(ELEMENT_TO_SCROLL_ID);

  if (elementToScroll && window.innerWidth < 600) {
    elementToScroll.scrollIntoView({ behavior: "smooth" });
  }
}

export function getVehicleRedeableNameFromOrderData(orderData) {
  let simpleName = "";

  if (orderData?.vehicleType === 1 && orderData?.brand && orderData?.model?.modelName) {
    const firstModelNameWord = orderData?.model?.modelName.split(" ")[0];
    simpleName = `un ${orderData.brand} ${firstModelNameWord} del ${orderData?.date?.year}`;
  } else if (orderData?.vehicleType === 2) {
    simpleName = `una moto del ${orderData?.date?.year}`;
  }

  return simpleName;
}

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
      : ""
  }
  `;
}

export function getFeeForHighTicketOrder(itp) {
  let fee = 0;

  if (itp > 200) fee = itp * 0.02;

  return fee;
}
