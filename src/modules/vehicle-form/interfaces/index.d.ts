import { DayInMonth } from '@modules/core/interfaces';
import { Fuel, VehicleType } from './enums';
import { AutonomousCommunityValue, MotorbikeCCRange } from './import/enums';

export type IBuyerCommunity = AutonomousCommunityValue | undefined;


export interface IVehicleFormData {
  visibleFields: number;
  date: VehicleDate;
  daysInMonth: DayInMonth[];
  registrationDate: string;
  buyerCommunity: IBuyerCommunity;
  phoneNumber: string;
  inputsData: IFormInputs;
  vehicle: CarFormData & MotorbikeFormData;
}

interface IFormInputs extends IFormCarInputs, IFormMotorbikeInputs {
  date: { day: string; month: string; year: string };
  buyerCommunity: IBuyerCommunity;
  phoneNumber: string;
  vehicleTermsAccepted: boolean;
}

interface IFormCarInputs {
  brand: string;
  fuel: string;
  model: string;
}

interface IFormMotorbikeInputs {
  cc: string;
}

export interface IFormDataLoading {
  brand?: boolean;
  fuel?: boolean;
  model?: boolean;
  itp?: boolean;
  cc?: boolean;
}

interface CarFormData {
  type: VehicleType;
  brand: string;
  fuel: Fuel;
  model: CarModel;
}

interface MotorbikeFormData {
  type: VehicleType;
  cc: MotorbikeCCRange | "";
  value: number;
}

interface CarModel {
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