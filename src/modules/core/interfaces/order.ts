import { IVehicleFormData } from '@modules/vehicle-form/interfaces';

export interface IOrderDataContext {
  updateOrderData: (setStateFunc: (prevOrder: IOrder) => IOrder) => void;
  orderData: IOrder;
  isBillDataFilled: boolean | string;
}

export interface IOrder {
  orderId: string;
  isProduction: boolean;
  isReferralValid: boolean;
  vehicleForm: IVehicleFormData;
  itp: IITP;
  prices: IOrderPrices;
  crossSelling: ICrossSelling;
  billData: IBillData;
  documentsLaterData: IDocumentsLaterData;
}

export interface IITP {
  ITP: number;
  valorFiscal: number;
  imputacionItp: number;
  valorDepreciacion: number;
}

export interface IOrderPrices {
  basePrice: number;
  totalPrice: number;
  highTicketOrderFee: number;
  referralDiscount: number;
}

export interface ICrossSelling {
  etiquetaMedioambiental: boolean;
  informeDgt: boolean;
}

export interface IBillData {
  fullName: string;
  email: string;
}

type IDocumentsLaterData = { vehiclePlate: string };
