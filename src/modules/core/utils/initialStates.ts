import { IMultiStepContext } from '../interfaces';
import { Steps } from '../interfaces/enums';

export const multiStepContextInitialState: IMultiStepContext = {
  updateCurrentStep(newStep) {},
  currentStep: Steps.VEHICLE_FORM,
};
