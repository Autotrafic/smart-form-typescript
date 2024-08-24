import { CarFormData, IFormDataLoading, IFormInputs, IVehicleFormData, MotorbikeFormData } from '../interfaces';
import { VehicleType } from '../interfaces/enums';
import { AutonomousCommunityValue, MotorbikeCCRange } from '../interfaces/import/enums';
import {
  ICarDropdownOptions,
  IMotorbikeDropdownOptions,
  IVehicleFormDropdown,
  IVehiclesFormContext,
} from '../interfaces/states';
import { INITIAL_VISIBLE_FIELDS } from './constants';

const vehicleInitialState: CarFormData & MotorbikeFormData = {
  type: VehicleType.CAR,
  brand: '',
  fuel: '',
  model: {
    modelName: '',
    cv: 0,
    value: 0,
    startYear: 0,
    endYear: 0,
    cc: 0,
    cylindersNumber: 0,
    fuel: '',
    kwPower: 0,
    cvf: '',
    modelOf: '',
    id: '',
  },
  cc: MotorbikeCCRange.DEFAULT,
  value: 0,
};

const inputsDataInitialState: IFormInputs = {
  date: { day: '', month: '', year: '' },
  buyerCommunity: AutonomousCommunityValue.DEFAULT,
  phoneNumber: '',
  vehicleTermsAccepted: false,
  brand: '',
  fuel: '',
  model: '',
  cc: '',
};

export const formDataInitialState: IVehicleFormData = {
  visibleFields: INITIAL_VISIBLE_FIELDS,
  date: { day: '', month: '', year: '' },
  daysInMonth: [{ name: 0, value: 0 }],
  registrationDate: '00/00/00',
  buyerCommunity: AutonomousCommunityValue.DEFAULT,
  phoneNumber: '',
  vehicle: vehicleInitialState,
  inputsData: inputsDataInitialState,
};

export const formDataLoadingInitialState: IFormDataLoading = {
  brand: false,
  fuel: false,
  model: false,
  itp: false,
  cc: false,
};

export const carDropdownsOptionsInitialState: ICarDropdownOptions = {
  brands: [{ name: '', value: '' }],
  fuels: [{ name: '', value: '' }],
  models: [{ name: '', value: '' }],
};

export const motorbikeDropdownOptionsInitialState: IMotorbikeDropdownOptions = {
  ccs: [{ name: '', value: '' }],
};

export const vehicleDropdownsInitialState: IVehicleFormDropdown[] = [
  {
    title: '',
    propertyName: '',
    isFilled: false,
    value: '',
    options: [{ name: '', value: AutonomousCommunityValue.DEFAULT }],
    isVehicleData: false,
    isLoading: false,
  },
];

export const vehicleFormProviderInitialState: IVehiclesFormContext = {
  updateFormData(f) {},
  updateVisibleSteps() {},
  submitForm() {},
  formData: formDataInitialState,
  visibleFields: INITIAL_VISIBLE_FIELDS,
  dropdowns: vehicleDropdownsInitialState,
  loading: formDataLoadingInitialState,
};
