import styled from 'styled-components';
import Title from '@modules/core/design-system/Title';
import ResumeTitle from './ResumeTitle';
import StripeCheckout from './Stripe/StripeCheckout';
import VehicleResume from './VehicleResume';
import UserResume from './UserResume';
import { Steps } from '@modules/core/interfaces/enums';
import { useOrderData } from '@modules/core/context/orderData';
import { useMultiStep } from '@modules/core/context/multiStep';
import NavigationButtons from '@modules/core/components/NavigationButtons';
import { useState } from 'react';

const Container = styled.div`
  padding: 0.5em 1.4em 1.2em 1.4em;
`;

const ResumeSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
`;

const ResumeSection = styled.div``;

function Checkout() {
  const { updateCurrentStep } = useMultiStep();
  const { orderData, isBillDataFilled } = useOrderData();
  const [isUserBillCompleted, setIsUserBillCompleted] = useState<boolean>(false);

  const moveToNextStep = () => {
    if (isUserBillCompleted) {
      updateCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const moveToVehicleFormStep = () => {
    updateCurrentStep(Steps.VEHICLE_FORM);
  };

  return (
    <Container>
      <Title>Resumen del pedido</Title>
      <ResumeSectionWrapper>
        <ResumeSection>
          <VehicleResume vehicleData={orderData.vehicleForm} handleLink={moveToVehicleFormStep} />
        </ResumeSection>
        <ResumeSection>
          <UserResume isUserBillCompleted={isUserBillCompleted} setIsUserBillCompleted={setIsUserBillCompleted} />
        </ResumeSection>

        <ResumeSection>
          <ResumeTitle title="Pago" hideLink />
          <StripeCheckout moveToNextStep={moveToNextStep} isBillDataFilled={isBillDataFilled} />
        </ResumeSection>

        <NavigationButtons onlyBack />
      </ResumeSectionWrapper>
    </Container>
  );
}

export default Checkout;
