import React, { useMemo } from 'react';
import { loadStripe } from '@stripe/stripe-js/pure';
import { Elements } from '@stripe/react-stripe-js';
import styled from 'styled-components';
import VehiclesForm from './modules/vehicle-form/components';
import MultiStepHeader from './modules/core/components/MultiStepHeader/MultiStepHeader';
import { MultiStepProvider, useMultiStep } from './modules/core/context/multiStep';
import Summary from './modules/summary/components';
import Documents from './modules/documents/components';
import Checkout from './modules/checkout/components';
import { VehiclesFormProvider } from './modules/vehicle-form/context/vehiclesForm';
import { DocumentsProvider } from './modules/documents/context/documents';
import AfterCheckoutMessage from './modules/documents/components/after-checkout';
import DocumentsFinalMessage from './modules/documents/components/final-message';
import DocumentsLaterMessage from './modules/documents/components/documents-later/DocumentsLaterMessage';
import { OrderDataProvider } from './modules/core/context/orderData';
import { STEPS } from './modules/core/utils/constants';
import { createRoot } from 'react-dom/client';

// const stripeKey =
//   process.env.NODE_ENV === "production"
//     ? process.env.STRIPE_PUBLIC_KEY_PROD
//     : process.env.STRIPE_PUBLIC_KEY_DEV;

const isProduction = false;

const liveStripeKey = 'pk_live_51OAXtLJa5DLxJFBC7aB2X6WUKjNNJo24CrqewKWtBArD07qq4e72w84fBhew0cF2KC3uvvJz2DQZufq3KTzIEGne000knW0qAA';
const testStripeKey = 'pk_test_51OAXtLJa5DLxJFBCYB0nOmpL6NPG79GXYY1bfM0lqXA9F4Nbi7ptxd0MMIn6RdaMRi2L3qcNwDIFbNq8NKvqgD4Y002injPrP5';

const Container = styled.div``;

function App() {
  const { currentStep } = useMultiStep();

  const initStripe = useMemo(async () => loadStripe(isProduction ? liveStripeKey : testStripeKey), []);

  return (
    <Elements stripe={initStripe}>
      <MultiStepHeader />
      <Container>
        {currentStep === STEPS.VEHICLE_DATA && (
          <VehiclesFormProvider>
            <VehiclesForm />
          </VehiclesFormProvider>
        )}
        {currentStep === STEPS.SUMMARY && <Summary />}
        {currentStep === STEPS.CHECKOUT && <Checkout />}
        {currentStep === STEPS.CHECKOUT_MESSAGE && <AfterCheckoutMessage />}
        {currentStep === STEPS.DOCUMENTS && (
          <DocumentsProvider>
            <Documents />
          </DocumentsProvider>
        )}
        {currentStep === STEPS.FINAL_MESSAGE && <DocumentsFinalMessage />}
        {currentStep === STEPS.DOCUMENTS_LATER_MESSAGE && <DocumentsLaterMessage />}
      </Container>
    </Elements>
  );
}

export default function SmartForm({ isReferralValid }) {
  return (
    <MultiStepProvider>
      <OrderDataProvider isProduction={isProduction} isReferralValid={isReferralValid}>
        <App />
      </OrderDataProvider>
    </MultiStepProvider>
  );
}

const rootElement = document.getElementById('root');

const root = createRoot(rootElement!);

root.render(<SmartForm />);

