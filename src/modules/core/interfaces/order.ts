import { IVehicleFormGeneral } from '@modules/vehicle-form/interfaces';
import { VehicleType } from '@modules/vehicle-form/interfaces/enums';
import { ICarModel, IMotorbike } from '@modules/vehicle-form/interfaces/import';
import { Fuel } from '@modules/vehicle-form/interfaces/import/enums';

export interface IOrder {
  orderId: string;
  isProduction: boolean;
  isReferralValid: boolean;
  itp: IOrderITP;
  prices: IOrderPrices;
  crossSelling: IOrderCrossSelling;
  billData: IOrderBillData;
  vehicleForm: IOrderVehicleFormCar | IOrderVehicleFormMotorbike;
}

export interface IOrderITP {
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

export interface IOrderCrossSelling {
  etiquetaMedioambiental: boolean;
  informeDgt: boolean;
}

interface IOrderBillData {
  fullName: string;
  email: string;
}

interface IOrderVehicleFormCar extends IVehicleFormGeneral {
  vehicleType: VehicleType.CAR;
  brand: string;
  fuel: Fuel;
  model: ICarModel;
}

interface IOrderVehicleFormMotorbike extends IVehicleFormGeneral {
  vehicleType: VehicleType.MOTORBIKE;
  cc: IMotorbike;
}
