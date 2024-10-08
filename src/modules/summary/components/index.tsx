import styled from 'styled-components';
import { useEffect, useState } from 'react';
import NavigationButtons from '@modules/core/components/NavigationButtons';
import { useMultiStep } from '@modules/core/context/multiStep';
import { useOrderData } from '@modules/core/context/orderData';
import TotalTable from './TotalTable/TotalTable';
import DiscountAlert from '@modules/core/components/DiscountAlert';
import { sendSummaryEmail } from '../utils/email';
import { Steps } from '@modules/core/interfaces/enums';
import { CrossSelected } from '../interfaces';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5em 0.4em 1.2em 0.4em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 0.6em;
`;

function Summary() {
  const { orderData, updateOrderData } = useOrderData();
  const { updateCurrentStep } = useMultiStep();

  const [addedPrice, setAddedPrice] = useState<number>(0);
  const [crossSelected, setCrossSelected] = useState<CrossSelected>({
    etiquetaMedioambiental: false,
    informeDgt: false,
  });

  useEffect(() => {
    if (orderData.isProduction) sendSummaryEmail(orderData);
  }, []);

  const handleNextStep = (setStepState: (step: Steps) => number) => {
    updateOrderData((prev) => ({
      ...prev,
      prices: {
        ...prev.prices,
        totalPrice: Number((prev.prices.totalPrice + addedPrice).toFixed(2)),
      },
      crossSelling: crossSelected,
    }));
    updateCurrentStep(setStepState);
  };

  return (
    <Container>
      {orderData.isReferralValid && <DiscountAlert />}
      <TotalTable
        withExtras
        addedPrice={addedPrice}
        setAddedPrice={setAddedPrice}
        setCrossSelected={setCrossSelected}
        isReferralValid={orderData.isReferralValid}
      />
      <NavigationButtons updateCurrentStep={handleNextStep} />
    </Container>
  );
}

export default Summary;
