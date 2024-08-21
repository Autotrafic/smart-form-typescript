import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { IOrder, IOrderDataContext } from '../interfaces/order';
import { defaultOrderData, orderDataContextInitialState } from '../utils/initialStates';

const OrderDataStore = (isProduction: boolean, isReferralValid: boolean) => {
  const orderDataInitialState: IOrder = { ...defaultOrderData, isProduction, isReferralValid };

  const [orderData, setOrderData] = useState<IOrder>(orderDataInitialState);

  useEffect(() => {
    setOrderData((prev: IOrder) => ({ ...prev, isReferralValid }));
  }, [isReferralValid]);

  const updateOrderData = (setStateFunc: (prevOrder: IOrder) => IOrder) => {
    setOrderData(setStateFunc);
  };

  const isBillDataFilled = orderData.billData.fullName && orderData.billData.email;

  return {
    updateOrderData,

    orderData,
    isBillDataFilled,
  };
};

const OrderDataContext = createContext<IOrderDataContext>(orderDataContextInitialState);

export const useOrderData = () => useContext(OrderDataContext);

export const OrderDataProvider = ({
  isProduction,
  isReferralValid = false,
  children,
}: {
  isProduction: boolean;
  isReferralValid: boolean;
  children: ReactNode;
}) => {
  const orderDataStore = OrderDataStore(isProduction, isReferralValid);

  return <OrderDataContext.Provider value={orderDataStore}>{children}</OrderDataContext.Provider>;
};
