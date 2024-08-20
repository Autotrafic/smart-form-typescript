import { CarFormData, IFormDataLoading, IFormInputs, IVehicleFormData, MotorbikeFormData } from '../interfaces';
import { VehicleType } from '../interfaces/enums';
import { AutonomousCommunityValue } from '../interfaces/import/enums';
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
  cc: '',
  value: 0,
};

const inputsDataInitialState: IFormInputs = {
  date: { day: '', month: '', year: '' },
  buyerCommunity: undefined,
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
  registrationDate: '',
  buyerCommunity: undefined,
  phoneNumber: '',
  vehicle: vehicleInitialState,
  inputsData: inputsDataInitialState,
};

export const formDataLoadingInitialState: IFormDataLoading = {
  brand: false,
  fuel: false,
  model: false,
  itp: false,
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
    isFilled: '',
    value: '',
    options: [{ name: '', value: AutonomousCommunityValue.DEFAULT }],
    isVehicleData: false,
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
