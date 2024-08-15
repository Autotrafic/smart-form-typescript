import { useEffect } from "react";
import { useMultiStep } from "../context/multiStep";
import styled from "styled-components";
import { scrollToNextStep } from "../../../utils/functions";

const Container = styled.div``;

const withScrollable =
  (WrappedComponent) =>
  ({ step, ...props }) => {
    const { currentStep, currentStepRef } = useMultiStep();

    useEffect(() => {
      scrollToNextStep();
    }, []);

    return (
      <Container ref={step === currentStep ? currentStepRef : null}>
        <WrappedComponent {...props} />
      </Container>
    );
  };

export default withScrollable;
