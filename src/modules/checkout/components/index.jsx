import styled from "styled-components";
import Title from "@modules/core/design-system/Title";
import ResumeTitle from "./ResumeTitle";
import StripeCheckout from "./Stripe/StripeCheckout";
import VehicleResume from "./VehicleResume";
import UserResume from "./UserResume";
import {Steps} from "@modules/core/interfaces/enums";
import { useOrderData } from "@modules/core/context/orderData";
import { useMultiStep } from "@modules/core/context/multiStep";
import NavigationButtons from "@modules/core/components/NavigationButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { colors } from "@modules/core/utils/styles";

const Container = styled.div`
  padding: 0.5em 1.4em 1.2em 1.4em;
`;

const ResumeSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
`;

const ErrorWarning = styled.div`
  border: 2px solid ${colors.errorRed};
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorWarningText = styled.p`
  font-size: 12px;
  margin: 5px 6px;
  color: ${colors.errorRed};
  font-weight: bold;
`;

const ExclamationIcon = styled(FontAwesomeIcon)`
  color: ${colors.errorRed};
  width: 18px;
  height: 18px;
  margin: 5px 4px 5px 8px;
`;

const ResumeSection = styled.div``;

function Checkout() {
  const { updateCurrentStep } = useMultiStep();
  const { orderData, billDataFilled } = useOrderData();
  const [userBillCompleted, setUserBillCompleted] = useState(false);

  const moveToNextStep = () => {
    if (userBillCompleted) {
      updateCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const moveToVehicleFormStep = () => {
    updateCurrentStep(Steps.VEHICLE_DATA);
  };

  return (
    <Container>
      <Title>Resumen del pedido</Title>
      <ResumeSectionWrapper>
        <ResumeSection>
          <VehicleResume vehicleData={orderData.vehicleForm} handleLink={moveToVehicleFormStep} />
        </ResumeSection>
        <ResumeSection>
          <UserResume
            userBillCompleted={userBillCompleted}
            setUserBillCompleted={setUserBillCompleted}
          />
        </ResumeSection>

        <ResumeSection>
          <ResumeTitle title="Pago" hideLink />
          <StripeCheckout moveToNextStep={moveToNextStep} billDataFilled={billDataFilled} />
        </ResumeSection>

        <NavigationButtons onlyBack />
      </ResumeSectionWrapper>
    </Container>
  );
}

export default Checkout;
