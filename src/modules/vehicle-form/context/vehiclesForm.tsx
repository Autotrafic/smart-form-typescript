import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useOrderData } from '@modules/core/context/orderData';
import { fetchItpPrice } from '../services/itp';
import { useMultiStep } from '@modules/core/context/multiStep';
import { sendFirstTouchMessage } from '../services/whatsapp';
import { fetchCarBrands, fetchCarFuels, fetchCarModels, fetchFuelMotorbikeCCs } from '../services/vehicle';
import { processVehicleFormSubmit } from '../utils/formatter';
import { countPropertiesWithValue, getPrices } from '../utils/functions';
import { CarFormData, IFormDataLoading, IVehicleFormData } from '../interfaces';
import { VehicleType } from '../interfaces/enums';
import {
  carDropdownsOptionsInitialState,
  formDataLoadingInitialState,
  motorbikeDropdownOptionsInitialState,
  vehicleDropdownsInitialState,
  vehicleFormProviderInitialState,
} from '../utils/initialStates';
import { autonomousCommunities } from '@modules/core/utils/data';
import type {
  ICarDropdownOptions,
  IMotorbikeDropdownOptions,
  IVehicleFormDropdown,
  IVehiclesFormContext,
} from '../interfaces/states';
import { Steps } from '@modules/core/interfaces/enums';
import { IOrder } from '@modules/core/interfaces/order';

const VehiclesFormStore = (): IVehiclesFormContext => {
  const { updateCurrentStep } = useMultiStep();
  const { orderData, updateOrderData } = useOrderData();

  const [formData, setFormData] = useState<IVehicleFormData>(orderData.vehicleForm);
  const [carDropdownsOptions, setCarDropdownsOptions] = useState<ICarDropdownOptions>(carDropdownsOptionsInitialState);
  const [motorbikeDropdownsOptions, setMotorbikeDropdownsOptions] = useState<IMotorbikeDropdownOptions>(
    motorbikeDropdownOptionsInitialState
  );
  const [visibleFields, setVisibleFields] = useState<number>(orderData.vehicleForm.visibleFields);
  const [loading, setLoading] = useState<IFormDataLoading>(formDataLoadingInitialState);

  const { vehicle, inputsData } = formData;

  const updatedDate = useMemo(() => {
    return {
      day: formData.date.day,
      month: formData.date.month,
      year: formData.date.year,
    };
  }, [formData.date]);

  const updateFormData = (setStateFunc: (prevState: IVehicleFormData) => IVehicleFormData) => {
    setFormData(setStateFunc);
  };

  const updateVisibleSteps = () => {
    const filledFields = countPropertiesWithValue(formData);
    if (filledFields === visibleFields + 1) {
      setTimeout(() => {
        setVisibleFields((prevState: number) => prevState + 1);
      }, 400);
    }
  };

  useEffect(() => {
    if (vehicle.type === VehicleType.CAR) updateVisibleSteps();
  }, [formData]);

  useEffect(() => {
    const loadCarBrands = async () => {
      setLoading({ brand: true });
      const carBrandNamesOptions = await fetchCarBrands();
      setCarDropdownsOptions(
        (prevState): ICarDropdownOptions => ({
          ...prevState,
          brands: carBrandNamesOptions,
        })
      );
      setLoading({ brand: false });
    };

    loadCarBrands();
  }, []);

  useEffect(() => {
    const loadMotorbikeCCs = async () => {
      setLoading({ cc: true });
      const ccs = await fetchFuelMotorbikeCCs();
      setMotorbikeDropdownsOptions((prevState): IMotorbikeDropdownOptions => ({ ...prevState, ccs: ccs }));
      setLoading({ cc: false });
    };

    loadMotorbikeCCs();
  }, []);

  useEffect(() => {
    const loadCarFuels = async () => {
      const { brand } = vehicle as CarFormData;

      if (updatedDate.day && updatedDate.month && updatedDate.year && brand) {
        setLoading({ fuel: true });
        const carFuelsOptions = await fetchCarFuels(updatedDate.year, brand);
        setCarDropdownsOptions(
          (prevState): ICarDropdownOptions => ({
            ...prevState,
            fuels: carFuelsOptions,
          })
        );
        setLoading({ fuel: false });
      }
    };

    if (vehicle.type === VehicleType.CAR) loadCarFuels();
  }, [updatedDate, formData.registrationDate, vehicle]);

  useEffect(() => {
    const loadCarModels = async () => {
      const { day, month, year } = updatedDate;
      const { brand, fuel } = vehicle as CarFormData;

      if (day && month && year && brand && fuel) {
        setLoading({ model: true });
        const carModelsOptions = await fetchCarModels(year, brand, fuel);
        setCarDropdownsOptions(
          (prevState): ICarDropdownOptions => ({
            ...prevState,
            models: carModelsOptions,
          })
        );
        setLoading({ model: false });
      }
    };

    if (vehicle.type === VehicleType.CAR) loadCarModels();
  }, [updatedDate, vehicle]);

  const submitForm = async () => {
    setLoading({ itp: true });

    const processedFormData = processVehicleFormSubmit(formData);
    const itp = await fetchItpPrice(processedFormData);
    const prices = getPrices(itp.ITP, processedFormData, orderData.isReferralValid);

    sendFirstTouchMessage(processedFormData.phoneNumber, formData, orderData.isReferralValid);

    if (itp)
      updateOrderData(
        (prev: IOrder): IOrder => ({
          ...prev,
          vehicleForm: { ...formData, visibleFields },
          itp,
          prices,
        })
      );

    updateCurrentStep(Steps.SUMMARY);
    setLoading({ itp: false });
  };

  const commonDropdowns = [
    {
      title: 'Comunidad autónoma del comprador',
      propertyName: 'buyerCommunity',
      isFilled: formData.buyerCommunity,
      value: inputsData.buyerCommunity,
      options: autonomousCommunities,
      isVehicleData: false,
    },
  ];

  const carDropdowns = [
    {
      title: 'Marca',
      propertyName: 'brand',
      isFilled: vehicle.brand,
      value: inputsData.brand,
      options: carDropdownsOptions.brands,
      isVehicleData: true,
    },
    {
      title: 'Combustible',
      propertyName: 'fuel',
      isFilled: vehicle.fuel,
      value: inputsData.fuel,
      options: carDropdownsOptions.fuels,
      isVehicleData: true,
    },
    {
      title: 'Modelo',
      propertyName: 'model',
      isFilled: vehicle.model.modelName,
      value: inputsData.model,
      options: carDropdownsOptions.models,
      isVehicleData: true,
    },
    ...commonDropdowns,
  ];

  const motorbikeDropdowns = [
    {
      title: 'Cilindrada',
      propertyName: 'cc',
      isFilled: vehicle.cc,
      value: inputsData.cc,
      options: motorbikeDropdownsOptions.ccs,
      isVehicleData: true,
    },
    ...commonDropdowns,
  ];

  const dropdowns: IVehicleFormDropdown[] = useMemo(() => {
    switch (vehicle.type) {
      case VehicleType.CAR:
        return carDropdowns;
      case VehicleType.MOTORBIKE:
        return motorbikeDropdowns;
      default:
        return vehicleDropdownsInitialState;
    }
  }, [formData, carDropdowns, motorbikeDropdowns]);

  return {
    updateFormData,
    updateVisibleSteps,
    submitForm,

    formData,
    visibleFields,
    dropdowns,
    loading,
  };
};

const FormDataContext = createContext<IVehiclesFormContext>(vehicleFormProviderInitialState);

export const useVehiclesForm = () => useContext(FormDataContext);

export const VehiclesFormProvider = ({ children }: { children: ReactNode }) => {
  const vehiclesFormStore = VehiclesFormStore();

  return <FormDataContext.Provider value={vehiclesFormStore}>{children}</FormDataContext.Provider>;
};
