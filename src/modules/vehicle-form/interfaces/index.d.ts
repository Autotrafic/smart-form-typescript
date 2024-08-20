import { DayInMonth } from '@modules/core/interfaces/general';
import { Fuel, VehicleType } from './enums';
import { AutonomousCommunityValue, MotorbikeCCRange } from './import/enums';

export interface VehicleFormData extends IVehicleFormGeneral {
  vehicle: CarFormData & MotorbikeFormData;
}

export interface IVehicleFormGeneral {
  visibleFields: number;
  date: VehicleDate;
  daysInMonth: DayInMonth[];
  registrationDate: string;
  buyerCommunity: AutonomousCommunityValue | undefined;
  phoneNumber: string;
  inputsData: IFormInputs;
}

interface IFormInputs {
  date: { day: string; month: string; year: string };
  vehicle: IFormCarInputs & IFormMotorbikeInputs;
  buyerCommunity: AutonomousCommunityValue | undefined;
  phoneNumber: string;
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
}

interface CarFormData {
  type: VehicleType.CAR;
  brand: string;
  fuel: Fuel;
  model: CarModel;
}

interface MotorbikeFormData {
  type: VehicleType.MOTORBIKE;
  cc: MotorbikeCCRange | undefined;
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
