import styled, { css, keyframes } from "styled-components";
import { colors } from "../../../utils/constants";
import { useEffect, useState } from "react";
import Modal from "../../core/design-system/Modal";
import SummaryModalContent from "./SummaryModalContent";
import { styles } from "../../../utils/styles";

const growShrink = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3); // Adjust this as needed
  }
  100% {
    transform: scale(1);
  }
`;

const SummaryTitle = styled.span`
  color: ${colors.black};
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
  ${(props) =>
    props.animatePrice &&
    css`
      animation: ${growShrink} 0.5s ease-in-out;
    `};
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1em;
  border-radius: 3px;
`;

const BudgetTitleWrapper = styled.div`
  display: flex;
  gap: 0.6em;
  align-items: center;
  justify-content: center;
`;

const BudgetSubtitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const BudgetSubtitle = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${colors.black};
  white-space: nowrap;
  @media (min-width: 476px) {
    white-space: nowrap;
  }
`;

const BudgetLink = styled.span`
  ${styles.link}
`;

const Line = styled.div`
  background-color: ${colors.secondaryGrey};
  width: 100%;
  height: 2px;
`;

const SummaryBudget = ({ title, price, isITP, data }) => {
  const [animatePrice, setAnimatePrice] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setAnimatePrice(true);
    const timer = setTimeout(() => setAnimatePrice(false), 500);
    return () => clearTimeout(timer);
  }, [price]);

  return (
    <TitleContainer>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <SummaryModalContent data={data} />
      </Modal>
      <BudgetTitleWrapper>
        <SummaryTitle>{title}</SummaryTitle>
        {isITP && (
          <BudgetSubtitleWrapper>
            {window.innerWidth >= 480 && (
              <BudgetSubtitle>(Impuesto de Transmisiones Patrimoniales)</BudgetSubtitle>
            )}
            <BudgetLink onClick={() => setShowModal((prevState) => !prevState)}>
              Saber más
            </BudgetLink>
          </BudgetSubtitleWrapper>
        )}
      </BudgetTitleWrapper>

      <Line />
      <SummaryTitle animatePrice={animatePrice}>{price} €</SummaryTitle>
    </TitleContainer>
  );
};

export default SummaryBudget;
