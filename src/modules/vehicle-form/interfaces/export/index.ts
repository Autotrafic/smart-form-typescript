import { ICrossSelling, IITP, IOrderPrices } from '@modules/core/interfaces/order';
import { ICarModel, IMotorbike } from '../import';
import { AutonomousCommunityValue, Fuel } from '../import/enums';
import { VehicleType } from '../enums';
import { StripeUserData } from '@modules/checkout/interfaces';

export interface IRequestBodyCarFuels {
  carYear: number;
  brandName: string;
}

export interface IRequestBodyCarModels extends IRequestBodyCarFuels {
  fuel: Fuel;
}

export interface IRequestBodyCalculateITP {
  tipoVehiculo: VehicleType;
  fechaMatriculacion: string;
  comunidadAutonoma: AutonomousCommunityValue;
  valorVehiculo: number;
  cilindrada: number;
  potenciaFiscal: number | null;
}

export interface IRequestBodyRegisterOrder {
  orderId: string;
  isProduction: boolean;
  isReferralValid: boolean;
  itp: IITP;
  prices: IOrderPrices;
  crossSelling: ICrossSelling;
  vehicle: ICarSpecifications | IMotorbikeSpecifications;
  user: IRegisterOrderUser;
}

export interface CreateTotalumOrderBody {
  orderId: string;
}

export interface ICarSpecifications extends ICarModel {
  type: VehicleType.CAR;
  registrationDate: string;
  brand: string;
}

export interface IMotorbikeSpecifications extends IMotorbike {
  type: VehicleType.MOTORBIKE;
  registrationDate: string;
}

export interface IRegisterOrderUser {
  fullName: string;
  phoneNumber: string;
  email: string;
  buyerCommunity: AutonomousCommunityValue;
}

export interface CreateIntentRequestBody {
  amount: number;
  userData: StripeUserData;
}

export interface SendNotificationBody {
  message: string;
  channel?: 'whatsapp_messages' | 'orders';
}

export interface SendWhatsAppNotificationBody extends SendNotificationBody {
  phoneNumber: string;
}
