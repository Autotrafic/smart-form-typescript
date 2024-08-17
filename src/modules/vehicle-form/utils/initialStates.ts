import { VehicleFormData } from '../interfaces';
import { VehicleType } from '../interfaces/enums';
import { INITIAL_VISIBLE_FIELDS } from './constants';

const carInitialState = {
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
};

const motorbikeInitialState = {
  type: VehicleType.MOTORBIKE,
  cc: undefined,
  value: 0,
};

export const vehiclesInitialState = [carInitialState, carInitialState, motorbikeInitialState];

export const formDataInitialState: VehicleFormData = {
  visibleFields: INITIAL_VISIBLE_FIELDS,
  date: { day: '', month: '', year: '' },
  daysInMonth: [{ name: 0, value: 0 }],
  registrationDate: '',
  buyerCommunity: undefined,
  phoneNumber: '',
  vehicle: vehiclesInitialState[VehicleType.CAR],
};

export const formDataLoadingInitialState = {
  brand: false,
  fuel: false,
  model: false,
  itp: false,
};
