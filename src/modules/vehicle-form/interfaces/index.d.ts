import { DayInMonth } from '../../core/interfaces/general';
import { Fuel, MotorbikeCC } from './enums';
import { AutonomousCommunityValue } from './import/enums';

export interface VehicleFormData extends IVehicleFormGeneral {
  vehicle: CarFormData | MotorbikeFormData;
}

export interface IVehicleFormGeneral {
  vehicleType: number;
  visibleFields: number;
  date: VehicleDate;
  daysInMonth: DayInMonth[];
  registrationDate: string;
  buyerCommunity: AutonomousCommunityValue;
  phoneNumber: string;
}

interface CarFormData {
  brand: string;
  fuel: Fuel;
  model: CarModel;
}

interface MotorbikeFormData {
  cc: MotorbikeCC;
  value: number;
  id: string;
}

interface CarModel {
  modelName: string;
  cv: number;
  value: number;
  startYear: number;
  endYear: number;
  cc: number;
  cylindersNumber: 4;
  fuel: Fuel;
  kwPower: number;
  cvf: string;
  modelOf: string;
  id: string;
}
