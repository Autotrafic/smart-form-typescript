import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useOrderData } from '@modules/core/context/orderData';
import { fetchItpPrice } from '../services/itp';
import { useMultiStep } from '@modules/core/context/multiStep';
import { sendFirstTouchMessage } from '../services/whatsapp';
import { fetchCarBrands, fetchCarFuels, fetchCarModels, fetchFuelMotorbikeCCs } from '../services/vehicle';
import { processVehicleFormSubmit } from '../utils/formatter';
import { countPropertiesWithValue, getPrices } from '../utils/functions';
import { STEPS } from '@modules/core/utils/constants';
import { CarFormData, IFormDataLoading, VehicleFormData } from '../interfaces';
import { VehicleType } from '../interfaces/enums';
import { formDataLoadingInitialState } from '../utils/initialStates';
import { autonomousCommunities } from '@modules/core/utils/data';

const FormDataContext = createContext(null);

const VehiclesFormStore = () => {
  const { updateCurrentStep } = useMultiStep();
  const { orderData, updateOrderData } = useOrderData();

  const [formData, setFormData] = useState<VehicleFormData>(orderData.vehicleForm);
  const [carDropdownsOptions, setCarDropdownsOptions] = useState({});
  const [motorbikeDropdownsOptions, setMotorbikeDropdownsOptions] = useState({});
  const [visibleFields, setVisibleFields] = useState(orderData.vehicleForm.visibleFields);
  const [loading, setLoading] = useState<IFormDataLoading>(formDataLoadingInitialState);

  const { vehicle, inputsData } = formData;

  const updatedDate = useMemo(() => {
    return {
      day: formData.date.day,
      month: formData.date.month,
      year: formData.date.year,
    };
  }, [formData.date]);

  const updateFormData = (data) => {
    setFormData(data);
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
      setCarDropdownsOptions((prevState) => ({
        ...prevState,
        brands: carBrandNamesOptions,
      }));
      setLoading({ brand: false });
    };

    loadCarBrands();
  }, []);

  useEffect(() => {
    const loadMotorbikeCCs = async () => {
      setLoading({ cc: true });
      const ccs = await fetchFuelMotorbikeCCs();
      setMotorbikeDropdownsOptions((prevState) => ({ ...prevState, ccs: ccs }));
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
        setCarDropdownsOptions((prevState) => ({
          ...prevState,
          fuels: carFuelsOptions,
        }));
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
        setCarDropdownsOptions((prevState) => ({
          ...prevState,
          models: carModelsOptions,
        }));
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
      updateOrderData((prev) => ({
        ...prev,
        vehicleForm: { ...formData, visibleFields },
        itp,
        prices,
      }));

    updateCurrentStep(STEPS.SUMMARY);
    setLoading({ itp: false });
  };

  const commonDropdowns = [
    {
      title: 'Comunidad autónoma del comprador',
      propertyName: 'buyerCommunity',
      isFilled: formData.buyerCommunity,
      value: 'buyerCommunity' in inputsData && inputsData.buyerCommunity,
      options: autonomousCommunities,
      isVehicleData: false,
    },
  ];

  const carDropdowns = [
    {
      title: 'Marca',
      propertyName: 'brand',
      isFilled: 'brand' in vehicle && vehicle.brand,
      value: 'brand' in inputsData && inputsData.brand,
      options: carDropdownsOptions?.brands,
      isVehicleData: true,
    },
    {
      title: 'Combustible',
      propertyName: 'fuel',
      isFilled: 'fuel' in vehicle && vehicle.fuel,
      value: 'fuel' in inputsData && inputsData.fuel,
      options: carDropdownsOptions?.fuels,
      isVehicleData: true,
    },
    {
      title: 'Modelo',
      propertyName: 'model',
      isFilled: 'model' in vehicle && vehicle.model.modelName,
      value: 'model' in inputsData && inputsData.model,
      options: carDropdownsOptions?.models,
      isVehicleData: true,
    },
    ...commonDropdowns,
  ];

  const motorbikeDropdowns = [
    {
      title: 'Cilindrada',
      propertyName: 'cc',
      isFilled: 'cc' in vehicle && vehicle.cc,
      value: 'cc' in inputsData && inputsData.cc,
      options: motorbikeDropdownsOptions?.ccs,
      isVehicleData: true,
    },
    ...commonDropdowns,
  ];

  const dropdowns = useMemo(() => {
    switch (vehicle.type) {
      case VehicleType.CAR:
        return carDropdowns;
      case VehicleType.MOTORBIKE:
        return motorbikeDropdowns;
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

export const useVehiclesForm = () => useContext(FormDataContext);

export const VehiclesFormProvider = ({ children }) => {
  const vehiclesFormStore = VehiclesFormStore();

  return <FormDataContext.Provider value={vehiclesFormStore}>{children}</FormDataContext.Provider>;
};
