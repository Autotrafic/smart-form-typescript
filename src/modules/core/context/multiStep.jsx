import React, { createContext, useContext, useState } from "react";
import { STEPS } from "../../../utils/constants";
import { scrollToNextStep } from "../../../utils/functions";

const MultiStepStore = () => {
  const [currentStep, setCurrentStep] = useState(STEPS.VEHICLE_DATA);

  return {
    updateCurrentStep(step) {
      setCurrentStep(step);
      scrollToNextStep();
    },

    currentStep,
  };
};

const MultiStepContext = createContext();

export const useMultiStep = () => useContext(MultiStepContext);

export const MultiStepProvider = ({ children }) => {
  const multiStepStore = MultiStepStore();

  return <MultiStepContext.Provider value={multiStepStore}>{children}</MultiStepContext.Provider>;
};
