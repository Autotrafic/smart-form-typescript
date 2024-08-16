import { MotorbikeCCRange, Fuel, ElectricPowerRange } from './enums';

export type CarBrandsResponse = CarBrand[];

export type MotorbikesResponse = Motorbike[];

export type ElectricMotorbikesResponse = ElectricMotorbike[];

export type FuelsResponse = Fuel[];

export type CarModelsResponse = CarModel[];

export interface ITPResponse {
  ITP: number;
  valorFiscal: number;
  imputacionItp: number;
  valorDepreciacion: number;
}

export interface CarBrand {
  brandName: string;
  id: string;
}

export interface Motorbike {
  cc: MotorbikeCCRange;
  value: number;
  id: string;
}

export interface ElectricMotorbike {
  power: ElectricPowerRange;
  value: number;
  id: string;
}

export interface CarModel {
  modelName: string;
  cv: number;
  value: number;
  startYear: number;
  endYear: number;
  cc: number;
  cylindersNumber: 4;
  fuel: Fuel;
  kwPower: number;
  cvf: number;
  modelOf: string;
  id: string;
}
