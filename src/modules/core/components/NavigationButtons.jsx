import styled from 'styled-components';
import Button from '../design-system/Button';
import { useMultiStep } from '../context/multiStep';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ $onlyBack }) => ($onlyBack ? 'start' : 'space-between')};
  justify-content: ${({ $onlyNext }) => ($onlyNext ? 'end' : 'space-between')};
`;

function NavigationButtons({ updateCurrentStep, onlyBack, onlyNext }) {
  const { updateCurrentStep: handleStep } = useMultiStep();

  const updateStepFunc = updateCurrentStep ?? handleStep;

  const navigateToPreviousStep = () => {
    updateStepFunc((prevStep) => prevStep - 1);
  };

  const navigateToNextStep = () => {
    updateStepFunc((prevStep) => prevStep + 1);
  };

  return (
    <Container $onlyBack={onlyBack} $onlyNext={onlyNext}>
      {!onlyNext && <Button title="Atrás" variant="secondary" onClick={navigateToPreviousStep} />}
      {!onlyBack && <Button title="Siguiente" onClick={navigateToNextStep} />}
    </Container>
  );
}

export default NavigationButtons;
