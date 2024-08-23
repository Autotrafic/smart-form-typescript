import React, { createContext, ReactNode, useContext, useState } from 'react';
import { scrollToNextStep } from '../utils/functions';
import { Steps } from '../interfaces/enums';
import { multiStepContextInitialState } from '../utils/initialStates';
import { IMultiStepContext } from '../interfaces';

const MultiStepStore = (): IMultiStepContext => {
  const [currentStep, setCurrentStep] = useState<Steps>(Steps.VEHICLE_FORM);

  return {
    updateCurrentStep(step: ((prevState: Steps) => Steps) | Steps) {
      setCurrentStep(step);
      scrollToNextStep();
    },

    currentStep,
  };
};

const MultiStepContext = createContext(multiStepContextInitialState);

export const useMultiStep = () => useContext(MultiStepContext);

export const MultiStepProvider = ({ children }: { children: ReactNode }) => {
  const multiStepStore = MultiStepStore();

  return <MultiStepContext.Provider value={multiStepStore}>{children}</MultiStepContext.Provider>;
};
