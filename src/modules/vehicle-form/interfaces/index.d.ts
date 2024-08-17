import { DayInMonth } from '../../core/interfaces/general';
import { Fuel } from './enums';
import { AutonomousCommunityValue, MotorbikeCCRange } from './import/enums';

export interface VehicleFormData extends IVehicleFormGeneral {
  vehicle: CarFormData | MotorbikeFormData;
}

export interface IVehicleFormGeneral {
  visibleFields: number;
  date: VehicleDate;
  daysInMonth: DayInMonth[];
  registrationDate: string;
  buyerCommunity: AutonomousCommunityValue | undefined;
  phoneNumber: string;
}

export interface IFormDataLoading {
  brand?: boolean;
  fuel?: boolean;
  model?: boolean;
  itp?: boolean;
}

interface CarFormData {
  type: number;
  brand: string;
  fuel: Fuel;
  model: CarModel;
}

interface MotorbikeFormData {
  type: number;
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
