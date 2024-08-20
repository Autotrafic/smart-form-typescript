import React, { createContext, useContext, useEffect, useState } from 'react';
import { createId } from '@paralleldrive/cuid2';
import { IVehicleFormData } from '@modules/vehicle-form/interfaces';
import { formDataInitialState } from '@modules/vehicle-form/utils/initialStates';
import { INITIAL_VISIBLE_FIELDS } from '@modules/vehicle-form/utils/constants';

const OrderDataStore = (isProduction: boolean, isReferralValid: boolean) => {
  interface IOrderDataInitialState {
    orderId: string;
    isProduction: boolean;
    isReferralValid: boolean;
    vehicleForm: IVehicleFormData;
    visibleFields: number;
  }

  const orderDataInitialState = {
    orderId: createId(),
    isProduction,
    isReferralValid,
    vehicleForm: formDataInitialState,
    visibleFields: INITIAL_VISIBLE_FIELDS,
  };

  const [orderData, setOrderData] = useState<IOrderDataInitialState>(orderDataInitialState);

  useEffect(() => {
    setOrderData((prev) => ({ ...prev, isReferralValid }));
  }, [isReferralValid]);

  const updateOrderData = (value) => {
    setOrderData(value);
  };

  const billDataFilled = orderData?.billData?.fullName && orderData?.billData?.email;

  return {
    updateOrderData,

    orderData,
    billDataFilled,
  };
};

const OrderDataContext = createContext();

export const useOrderData = () => useContext(OrderDataContext);

export const OrderDataProvider = ({ isProduction, isReferralValid = false, children }) => {
  const orderDataStore = OrderDataStore(isProduction, isReferralValid);

  return <OrderDataContext.Provider value={orderDataStore}>{children}</OrderDataContext.Provider>;
};
