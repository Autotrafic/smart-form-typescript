import styled from 'styled-components';
import Button from '../design-system/Button';
import { useMultiStep } from '../context/multiStep';
import { Steps } from '../interfaces/enums';

interface ContainerProps {
  $onlyBack: boolean | undefined;
  $onlyNext: boolean | undefined;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ $onlyBack }) => ($onlyBack ? 'start' : 'space-between')};
  justify-content: ${({ $onlyNext }) => ($onlyNext ? 'end' : 'space-between')};
`;

interface NavigationButtonsProps {
  onlyBack?: boolean;
  onlyNext?: boolean;
  updateCurrentStep?: (setStepFunc: (prev: Steps) => number) => void;
}

function NavigationButtons({ updateCurrentStep, onlyBack, onlyNext }: NavigationButtonsProps) {
  const { updateCurrentStep: handleStep } = useMultiStep();

  const existsUpdateFunc = !!updateCurrentStep;
  const updateStepFunc = existsUpdateFunc ? updateCurrentStep : handleStep;

  const navigateToPreviousStep = () => {
    updateStepFunc((prevStep: Steps) => prevStep - 1);
  };

  const navigateToNextStep = () => {
    updateStepFunc((prevStep: Steps) => prevStep + 1);
  };

  return (
    <Container $onlyBack={onlyBack} $onlyNext={onlyNext}>
      {!onlyNext && <Button title="Atrás" variant="secondary" onClick={navigateToPreviousStep} />}
      {!onlyBack && <Button title="Siguiente" onClick={navigateToNextStep} />}
    </Container>
  );
}

export default NavigationButtons;
