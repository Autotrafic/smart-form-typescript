import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useOrderData } from '../../core/context/orderData';
import { commonDropdowns } from '../utils/dropdowns';
import { fetchItpPrice } from '../services/itp';
import { useMultiStep } from '../../core/context/multiStep';
import { sendFirstTouchMessage } from '../services/whatsapp';
import { fetchCarBrands, fetchCarFuels, fetchCarModels, fetchFuelMotorbikeCCs } from '../services/vehicle';
import { processVehicleFormSubmit } from '../utils/formatter';
import { countPropertiesWithValue, getPrices } from '../utils/functions';
import { STEPS } from '../../core/utils/constants';

const FormDataContext = createContext();

const VehiclesFormStore = () => {
  const { updateCurrentStep } = useMultiStep();
  const { orderData, updateOrderData } = useOrderData();

  const [formData, setFormData] = useState(orderData.vehicleForm);
  const [carDropdownsOptions, setCarDropdownsOptions] = useState({});
  const [motorbikeDropdownsOptions, setMotorbikeDropdownsOptions] = useState({});
  const [visibleFields, setVisibleFields] = useState(orderData.vehicleForm.visibleFields);
  const [loading, setLoading] = useState({
    brand: false,
    fuel: false,
    model: false,
    itp: false,
  });

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
    if (filledFields === visibleFields + 5) {
      setTimeout(() => {
        setVisibleFields((prevState) => prevState + 1);
      }, 400);
    }
  };

  useEffect(() => {
    updateVisibleSteps();
  }, [formData]);

  useEffect(() => {
    const loadCarBrands = async () => {
      setLoading({ brand: true });
      const carBrandNamesOptions = await fetchCarBrands();
      setCarDropdownsOptions((prevState) => ({
        ...prevState,
        models: carBrandNamesOptions,
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
      if (updatedDate.day && updatedDate.month && updatedDate.year && formData.brand) {
        setLoading({ fuel: true });
        const carFuelsOptions = await fetchCarFuels(updatedDate.year, formData.brand);
        setCarDropdownsOptions((prevState) => ({
          ...prevState,
          fuels: carFuelsOptions,
        }));
        setLoading({ fuel: false });
      }
    };

    loadCarFuels();
  }, [updatedDate, formData?.registrationDate, formData?.brand]);

  useEffect(() => {
    const loadCarModels = async () => {
      if (updatedDate.day && updatedDate.month && updatedDate.year && formData.brand && formData.fuel) {
        setLoading({ model: true });
        const carModelsOptions = await fetchCarModels(updatedDate.year, formData.brand, formData.fuel);
        setCarDropdownsOptions((prevState) => ({
          ...prevState,
          modelNames: carModelsOptions,
        }));
        setLoading({ model: false });
      }
    };

    loadCarModels();
  }, [updatedDate, formData?.brand, formData?.fuel]);

  const submitForm = async () => {
    setLoading({ itp: true });

    const processedFormData = processVehicleFormSubmit(formData);
    const itp = await fetchItpPrice(processedFormData);
    const prices = getPrices(itp.ITP, processedFormData, orderData.isReferralValid);

    sendFirstTouchMessage(processedFormData.phoneNumber, formData, orderData.isReferralValid);

    if (itp)
      updateOrderData((prev) => ({
        ...prev,
        vehicleForm: { ...processedFormData, visibleFields },
        itp,
        prices,
      }));

    console.log('formDataa', formData);
    updateCurrentStep(STEPS.SUMMARY);
    setLoading({ itp: false });
  };

  const carDropdowns = [
    {
      title: 'Marca',
      propertyName: 'brand',
      options: carDropdownsOptions?.models,
    },
    {
      title: 'Combustible',
      propertyName: 'fuel',
      options: carDropdownsOptions?.fuels,
    },
    {
      title: 'Modelo',
      propertyName: 'model',
      options: carDropdownsOptions?.modelNames,
    },
    ...commonDropdowns,
  ];

  const motorbikeDropdowns = [
    {
      title: 'Cilindrada',
      propertyName: 'cc',
      options: motorbikeDropdownsOptions?.ccs,
    },
    ...commonDropdowns,
  ];

  const caravanDropdowns = [...commonDropdowns];

  const dropdowns = useMemo(() => {
    switch (formData.vehicleType) {
      case 1:
        return carDropdowns;
      case 2:
        return motorbikeDropdowns;
      case 3:
        return caravanDropdowns;
    }
  }, [formData, carDropdowns, motorbikeDropdowns, caravanDropdowns]);

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
