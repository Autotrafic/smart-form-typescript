import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { CarFormData, IFormDataLoading, IVehicleFormData } from '../interfaces';
import {
  ICarDropdownOptions,
  IMotorbikeDropdownOptions,
  IVehicleFormDropdown,
  IVehiclesFormContext,
} from '../interfaces/states';
import { VehicleType } from '../interfaces/enums';
import { autonomousCommunities } from '@modules/core/utils/data';
import {
  carDropdownsOptionsInitialState,
  formDataLoadingInitialState,
  motorbikeDropdownOptionsInitialState,
  vehicleDropdownsInitialState,
  vehicleFormProviderInitialState,
} from '../utils/initialStates';
import { fetchItpPrice } from '../services/itp';
import { sendFirstTouchMessage } from '../services/whatsapp';
import { fetchCarBrands, fetchCarFuels, fetchCarModels, fetchFuelMotorbikeCCs } from '../services/vehicle';
import { useMultiStep } from '@modules/core/context/multiStep';
import { useOrderData } from '@modules/core/context/orderData';
import { countPropertiesWithValue, filterBrandsToCommon, getPrices } from '../utils/functions';
import { Steps } from '@modules/core/interfaces/enums';
import { IOrder } from '@modules/core/interfaces/order';
import { IParsedVehicleRequest } from '../interfaces/import';
import { BRANDS_FULL_LIST_OPTION, BRANDS_REDUCED_LIST_OPTION } from '../utils/constants';
import { logWebQuery } from '@modules/core/services/log';

const VehiclesFormStore = (): IVehiclesFormContext => {
  const { updateCurrentStep } = useMultiStep();
  const { orderData, updateOrderData } = useOrderData();

  const [formData, setFormData] = useState<IVehicleFormData>(orderData.vehicleForm);
  const [visibleFields, setVisibleFields] = useState<number>(orderData.vehicleForm.visibleFields);
  const [loading, setLoading] = useState<IFormDataLoading>(formDataLoadingInitialState);
  const [carDropdownsOptions, setCarDropdownsOptions] = useState<ICarDropdownOptions>(carDropdownsOptionsInitialState);
  const [motorbikeDropdownsOptions, setMotorbikeDropdownsOptions] = useState<IMotorbikeDropdownOptions>(
    motorbikeDropdownOptionsInitialState
  );

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
      setLoading((prev: IFormDataLoading) => ({ ...prev, brand: true }));
      const carBrandNamesOptions = await fetchCarBrands();
      setCarDropdownsOptions(
        (prevState): ICarDropdownOptions => ({
          ...prevState,
          brands: carBrandNamesOptions,
        })
      );
      setLoading((prev: IFormDataLoading) => ({ ...prev, brand: false }));
    };

    loadCarBrands();
  }, []);

  useEffect(() => {
    const loadMotorbikeCCs = async () => {
      setLoading((prev: IFormDataLoading) => ({ ...prev, cc: true }));
      const ccs = await fetchFuelMotorbikeCCs();
      setMotorbikeDropdownsOptions((prevState): IMotorbikeDropdownOptions => ({ ...prevState, ccs: ccs }));
      setLoading((prev: IFormDataLoading) => ({ ...prev, cc: false }));
    };

    loadMotorbikeCCs();
  }, []);

  useEffect(() => {
    const { brand } = vehicle as CarFormData;

    const loadCarFuels = async () => {
      if (updatedDate.day && updatedDate.month && updatedDate.year && brand) {
        setLoading((prev: IFormDataLoading) => ({ ...prev, fuel: true }));
        const carFuelsOptions = await fetchCarFuels(Number(updatedDate.year), brand);
        setCarDropdownsOptions(
          (prevState): ICarDropdownOptions => ({
            ...prevState,
            fuels: carFuelsOptions,
          })
        );
        setLoading((prev: IFormDataLoading) => ({ ...prev, fuel: false }));
      }
    };

    if (
      vehicle.type === VehicleType.CAR &&
      brand !== BRANDS_FULL_LIST_OPTION.value &&
      brand !== BRANDS_REDUCED_LIST_OPTION.value
    )
      loadCarFuels();
  }, [updatedDate, formData.registrationDate, vehicle]);

  useEffect(() => {
    const loadCarModels = async () => {
      const { day, month, year } = updatedDate;
      const { brand, fuel } = vehicle as CarFormData;

      if (day && month && year && brand && fuel) {
        setLoading((prev: IFormDataLoading) => ({ ...prev, model: true }));
        const carModelsOptions = await fetchCarModels(Number(year), brand, fuel);
        setCarDropdownsOptions(
          (prevState): ICarDropdownOptions => ({
            ...prevState,
            models: carModelsOptions,
          })
        );
        setLoading((prev: IFormDataLoading) => ({ ...prev, model: false }));
      }
    };

    if (vehicle.type === VehicleType.CAR) loadCarModels();
  }, [updatedDate, vehicle]);

  const submitForm = async () => {
    setLoading((prev: IFormDataLoading) => ({ ...prev, itp: true }));

    if (formData.phoneNumber !== '654') await logWebQuery();

    const itp = await fetchItpPrice(formData);
    const prices = getPrices(itp.ITP, formData, orderData.isReferralValid);

    sendFirstTouchMessage(formData.phoneNumber, formData, orderData.isReferralValid);

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
    setLoading((prev: IFormDataLoading) => ({ ...prev, itp: false }));
  };

  const toggleCarBrandsOptions = (allBrands: IParsedVehicleRequest[], brandSelected: string) => {
    const fullList = [...allBrands, BRANDS_REDUCED_LIST_OPTION];
    const reducedList = [...filterBrandsToCommon(allBrands), BRANDS_FULL_LIST_OPTION];

    if (brandSelected !== BRANDS_REDUCED_LIST_OPTION.value && brandSelected !== '') {
      return fullList;
    } else {
      return reducedList;
    }
  };

  const commonDropdowns: IVehicleFormDropdown[] = [
    {
      title: 'Comunidad autónoma del comprador',
      propertyName: 'buyerCommunity',
      isFilled: !!formData.buyerCommunity,
      value: inputsData.buyerCommunity,
      options: autonomousCommunities,
      disabled: false,
      isVehicleData: false,
      isLoading: false,
    },
  ];

  const carDropdowns: IVehicleFormDropdown[] = [
    {
      title: 'Marca',
      propertyName: 'brand',
      isFilled: !!vehicle.brand,
      value: inputsData.brand,
      options: toggleCarBrandsOptions(carDropdownsOptions.brands, vehicle.brand),
      disabled: false,
      isVehicleData: true,
      isLoading: loading.brand,
    },
    {
      title: 'Combustible',
      propertyName: 'fuel',
      isFilled: !!vehicle.fuel,
      value: inputsData.fuel,
      options: carDropdownsOptions.fuels,
      isVehicleData: true,
      isLoading: loading.fuel,
      disabled:
        !vehicle.brand ||
        !(vehicle.brand !== BRANDS_FULL_LIST_OPTION.value) ||
        !(vehicle.brand !== BRANDS_REDUCED_LIST_OPTION.value) ||
        !updatedDate.day ||
        !updatedDate.month ||
        !updatedDate.year,
    },
    {
      title: 'Modelo',
      propertyName: 'model',
      isFilled: !!vehicle.model.modelName,
      value: inputsData.model,
      options: carDropdownsOptions.models,
      disabled: !vehicle.fuel,
      isVehicleData: true,
      isLoading: loading.model,
    },
    ...commonDropdowns,
  ];

  const motorbikeDropdowns: IVehicleFormDropdown[] = [
    {
      title: 'Cilindrada',
      propertyName: 'cc',
      isFilled: !!vehicle.cc,
      value: inputsData.cc,
      options: motorbikeDropdownsOptions.ccs,
      disabled: false,
      isVehicleData: true,
      isLoading: loading.cc,
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
