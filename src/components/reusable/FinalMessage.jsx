import styled from "styled-components";
import { colors } from "../../utils/constants";
import topImage from "../../assets/top-final-message-img.png";
import { useOrderData } from "../../context/orderData";

const MessageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10% 15% 30px 15%;
  text-align: center;
  color: #111111;
`;

const ConfirmationTitleContainer = styled.div`
  background-color: ${colors.primaryColor} !important;
  width: 100% !important;
  border-radius: 20% 50% 30% 50%/10% 20% 10% 30% !important;
  height: 130px !important;
  opacity: 0 !important;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.4),
    -5px -5px 15px rgba(255, 255, 255, 0.1);
  animation: slideBounce 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;

  @keyframes slideBounce {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    60% {
      transform: translateX(5%);
      opacity: 1;
    }
    75% {
      transform: translateX(-4%);
    }
    90% {
      transform: translateX(2%);
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const ConfirmationTitle = styled.p`
  font-size: 40px;
  font-weight: bold;
  color: white;
  padding: 0;
`;

const ConfirmationText = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const GreenConfirmationText = styled.p`
  font-size: 21px;
  font-weight: bold;
  color: #00bf63;
  margin: 0;
`;

const GreatfulText = styled.p`
  margin-top: 40px;
  margin-bottom: 0;
  font-size: 15px;
  font-weight: bold;
`;

const ButtonStyled = styled.button`
  padding: 10px 18px !important;
  margin-top: 15px !important;
  margin-bottom: 40px !important;
  background-color: #fff !important;
  color: ${colors.primaryColor} !important;
  border: 1px solid ${colors.primaryColor} !important;
  border-radius: 5px !important;
  font-size: 15px !important;
  font-weight: 600 !important;
  display: inline-block !important;
  cursor: pointer !important;
  &:hover {
    transition: 0.05s;
    border: 2px solid ${colors.primaryColor};
  }
`;

export default function FinalMessage({ children }) {
  const { orderData } = useOrderData();


  const nameParts = orderData.billData.fullName.split(" ");

  return (
    <>
      <MessageContainer>
        <ConfirmationText>
          ¡Genial, {nameParts[0]}! El pedido se ha realizado
          <GreenConfirmationText> correctamente ✅</GreenConfirmationText>
        </ConfirmationText>
        {children}
        <GreatfulText>
          Agradecemos muchísimo su confianza. ¡Esperamos verle de nuevo por
          aquí!
        </GreatfulText>

        <a
          href="https://www.autotrafic.es"
          target="_self"
          style={{ textDecoration: "none" }}
        >
          <ButtonStyled>Volver a Inicio</ButtonStyled>
        </a>
      </MessageContainer>
    </>
  );
}
