import { Fuel, MotorbikeCC } from './enums';

interface VehicleFormData {
  registrationDate: string;
  vehicle: CarFormData | MotorbikeFormData;
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
