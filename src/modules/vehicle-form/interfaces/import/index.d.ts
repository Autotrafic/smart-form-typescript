import { MotorbikeCCRange, Fuel, ElectricPowerRange } from './enums';

export type CarBrandsResponse = ICarBrand[];

export type MotorbikesResponse = IMotorbike[];

export type ElectricMotorbikesResponse = IElectricMotorbike[];

export type FuelsResponse = Fuel[];

export type CarModelsResponse = ICarModel[];

export interface ITPResponse {
  ITP: number;
  valorFiscal: number;
  imputacionItp: number;
  valorDepreciacion: number;
}

export interface ICarBrand {
  brandName: string;
  id: string;
}

export interface IMotorbike {
  cc: MotorbikeCCRange;
  value: number;
  id: string;
}

export interface IElectricMotorbike {
  power: ElectricPowerRange;
  value: number;
  id: string;
}

export interface ICarModel {
  modelName: string;
  cv: number;
  value: number;
  startYear: number;
  endYear: number;
  cc: number;
  cylindersNumber: number;
  fuel: Fuel;
  kwPower: number;
  cvf: string;
  modelOf: string;
  id: string;
}
