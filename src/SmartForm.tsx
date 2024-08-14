import React, { useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js/pure";
import { Elements } from "@stripe/react-stripe-js";
import styled from "styled-components";
import VehiclesForm from "./components/containers/VehiclesForm";
import MultiStepHeader from "./components/MultiStepHeader";
import { MultiStepProvider, useMultiStep } from "./context/multiStep";
import Summary from "./components/containers/Summary";
import { STEPS } from "./utils/constants";
import Documents from "./components/containers/Documents";
import Checkout from "./components/containers/Checkout";
import { VehiclesFormProvider } from "./context/vehiclesForm";
import { DocumentsProvider } from "./context/documents";
import AfterCheckoutMessage from "./components/containers/AfterPayMessage/AfterCheckoutMessage";
import DocumentsFinalMessage from "./components/containers/Documents/DocumentsFinalMessage";
import DocumentsLaterMessage from "./components/containers/Documents/DocumentsLaterMessage";
import { OrderDataProvider } from "./context/orderData";

// const stripeKey =
//   process.env.NODE_ENV === "production"
//     ? process.env.STRIPE_PUBLIC_KEY_PROD
//     : process.env.STRIPE_PUBLIC_KEY_DEV;

const isProduction = false;

const liveStripeKey = "pk_live_51OAXtLJa5DLxJFBC7aB2X6WUKjNNJo24CrqewKWtBArD07qq4e72w84fBhew0cF2KC3uvvJz2DQZufq3KTzIEGne000knW0qAA";
const testStripeKey = "pk_test_51OAXtLJa5DLxJFBCYB0nOmpL6NPG79GXYY1bfM0lqXA9F4Nbi7ptxd0MMIn6RdaMRi2L3qcNwDIFbNq8NKvqgD4Y002injPrP5";

const Container = styled.div``;

function App() {
  const { currentStep } = useMultiStep();

  const initStripe = useMemo(
    async () => loadStripe(isProduction ? liveStripeKey : testStripeKey),
    []
  );

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

export default function SmartForm({isReferralValid}) {
  return (
    <MultiStepProvider>
      <OrderDataProvider isProduction={isProduction} isReferralValid={isReferralValid}>
        <App />
      </OrderDataProvider>
    </MultiStepProvider>
  );
}
