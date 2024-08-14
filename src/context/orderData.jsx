import React, { createContext, useContext, useEffect, useState } from "react";
import { createId } from "@paralleldrive/cuid2";

const INITIAL_VISIBLE_FIELDS = 3;

const OrderDataStore = (isProduction, isReferralValid) => {
  const orderDataInitialState = {
    orderId: createId(),
    isProduction,
    isReferralValid,
    vehicleForm: {
      vehicleType: 1,
      visibleFields: INITIAL_VISIBLE_FIELDS,
      date: { day: "", month: "", year: "" },
    },
  };

  const [orderData, setOrderData] = useState(orderDataInitialState);

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
