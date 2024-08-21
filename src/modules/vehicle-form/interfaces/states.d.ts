import { AutonomousCommunity } from '@modules/core/utils/data';
import {
  ICarBrandsResponseParsed,
  ICarModelsResponseParsed,
  IFuelsResponseParsed,
  IMotorbikesResponseParsed,
} from './import';
import { Fuel, MotorbikeCCRange } from './import/enums';
import { IBuyerCommunity, IFormDataLoading, IVehicleFormData } from '.';

export interface ICarDropdownOptions {
  brands: ICarBrandsResponseParsed;
  fuels: IFuelsResponseParsed;
  models: ICarModelsResponseParsed;
}

export interface IMotorbikeDropdownOptions {
  ccs: IMotorbikesResponseParsed;
}

export interface IVehiclesFormContext {
  updateFormData: (setStateFunc: (prevOrder: IVehicleFormData) => IVehicleFormData) => void;
  updateVisibleSteps: () => void;
  submitForm: () => void;
  formData: IVehicleFormData;
  visibleFields: number;
  dropdowns: IVehicleFormDropdown[];
  loading: IFormDataLoading;
}

interface IVehicleFormDropdown {
  title: string;
  propertyName: string;
  isFilled: IBuyerCommunity | Fuel | MotorbikeCCRange | string;
  value: IBuyerCommunity | Fuel | MotorbikeCCRange | string;
  options:
    | AutonomousCommunity[]
    | ICarBrandsResponseParsed
    | IFuelsResponseParsed
    | ICarModelsResponseParsed
    | IMotorbikesResponseParsed;
  isVehicleData: boolean;
}
