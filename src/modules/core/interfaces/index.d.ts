import { Steps } from './enums';

export interface VehicleDate {
  day: string;
  month: string;
  year: string;
}

export interface DayInMonth {
  name: number;
  value: number;
}

export interface IMultiStepContext {
  updateCurrentStep: (newStep: Steps) => void;
  currentStep: Steps;
}