import { MotorbikeCCRange, Fuel, ElectricPowerRange } from './enums';

export type ICarBrandsResponse = ICarBrand[];
export type ICarBrandsResponseParsed = IParsedVehicleRequest[];

export type IMotorbikesResponse = IMotorbike[];
export type IMotorbikesResponseParsed = IParsedVehicleRequest[];

export type IElectricMotorbikesResponse = IElectricMotorbike[];
export type IElectricMotorbikesResponseParsed = IParsedVehicleRequest[];

export type IFuelsResponse = Fuel[];
export type IFuelsResponseParsed = IParsedVehicleRequest[];

export type ICarModelsResponse = ICarModel[];
export type ICarModelsResponseParsed = IParsedVehicleRequest[];

interface IParsedVehicleRequest {
  name: string;
  value: string;
}

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
