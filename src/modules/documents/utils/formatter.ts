import { autonomousCommunities } from '@modules/core/utils/data';
import { compressFile } from './functions';
import { IOrder } from '@modules/core/interfaces/order';
import { AutonomousCommunityValue } from '@modules/vehicle-form/interfaces/import/enums';

export default function updateFileName(file: File, newName: string): File {
  const extensionIndex = file.name.lastIndexOf('.');
  const extension = file.name.substring(extensionIndex);

  const newFileName = newName + extension;

  const renamedFile = new File([file], newFileName, { type: file.type });

  return renamedFile;
}

export function processOrderDataForSubmit(orderData: IOrder) {
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

function getCommunityName(communityCode: AutonomousCommunityValue) {
  if (!communityCode) return;

  const lookup = {};
  autonomousCommunities.forEach((region) => {
    lookup[region.value] = region.name;
  });

  return lookup[communityCode] || 'Code not found';
}

export async function processFilesForSubmit(files) {
  const { dniBackSeller, dniFrontalSeller, dniBackBuyer, dniFrontalBuyer, contratoCompr, fichaTecnica, permisoCirculacion } =
    files;

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
