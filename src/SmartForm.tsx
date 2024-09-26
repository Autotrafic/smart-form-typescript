import "@assets/globals.css";
import React, { useMemo } from 'react';
import { loadStripe } from '@stripe/stripe-js/pure';
import { Elements } from '@stripe/react-stripe-js';
import styled from 'styled-components';
import VehiclesForm from './modules/vehicle-form/components';
import MultiStepHeader from './modules/core/components/MultiStepHeader/MultiStepHeader';
import { MultiStepProvider, useMultiStep } from './modules/core/context/multiStep';
import Summary from './modules/summary/components';
import Checkout from './modules/checkout/components';
import AfterCheckoutMessage from './modules/checkout/components/after-checkout';
import { VehiclesFormProvider } from './modules/vehicle-form/context/vehiclesForm';
import { OrderDataProvider } from './modules/core/context/orderData';
import { Steps } from '@modules/core/interfaces/enums';
import { isProduction, stripeKey } from "@src/environment";

const Container = styled.div``;

function App() {
  const { currentStep } = useMultiStep();

  const initStripe = useMemo(async () => loadStripe(stripeKey), []);

  return (
    <Elements stripe={initStripe}>
      <MultiStepHeader />
      <Container>
        {currentStep === Steps.VEHICLE_FORM && (
          <VehiclesFormProvider>
            <VehiclesForm />
          </VehiclesFormProvider>
        )}
        {currentStep === Steps.SUMMARY && <Summary />}
        {currentStep === Steps.CHECKOUT && <Checkout />}
        {currentStep === Steps.CHECKOUT_MESSAGE && <AfterCheckoutMessage />}
      </Container>
    </Elements>
  );
}

export default function SmartForm({ isReferralValid }: { isReferralValid: boolean }) {
  return (
    <MultiStepProvider>
      <OrderDataProvider isProduction={isProduction} isReferralValid={isReferralValid}>
        <App />
      </OrderDataProvider>
    </MultiStepProvider>
  );
}
