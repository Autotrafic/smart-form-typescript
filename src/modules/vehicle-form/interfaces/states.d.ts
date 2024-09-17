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
  | IMotorbikesResponseParsed
  | VehicleDate;

export type IDropdownValue = IBuyerCommunity | Fuel | MotorbikeCCRange | string;

interface IVehicleFormDropdown {
  title: string;
  propertyName: IPropertyToModifyProps;
  value: IDropdownValue;
  options: IDropdownOptions;
  disabled: boolean;
  isVehicleData: boolean;
  isFilled: boolean;
  isLoading: boolean;
}
