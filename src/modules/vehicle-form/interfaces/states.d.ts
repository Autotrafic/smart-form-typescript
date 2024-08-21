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

export type IPropertyToModifyProps =
  | 'buyerCommunity'
  | 'brand'
  | 'fuel'
  | 'model'
  | 'cc'
  | 'phoneNumber'
  | 'vehicleTermsAccepted'
  | '';

export type IDropdownOptions =
  | AutonomousCommunity[]
  | ICarBrandsResponseParsed
  | IFuelsResponseParsed
  | ICarModelsResponseParsed
  | IMotorbikesResponseParsed;

interface IVehicleFormDropdown {
  title: string;
  propertyName: IPropertyToModifyProps;
  value: IBuyerCommunity | Fuel | MotorbikeCCRange | string;
  options: IDropdownOptions;

  isVehicleData: boolean;
  isFilled: IBuyerCommunity | Fuel | MotorbikeCCRange | string;
  isLoading: boolean;
}
