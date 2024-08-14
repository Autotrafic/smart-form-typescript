import { useOrderData } from "../../../context/orderData";
import FinalMessage from "../../reusable/FinalMessage";
import styled from "styled-components";

const ExplicationText = styled.p`
  font-size: 16px;
`;

const BoldText = styled.p`
  font-size: 15px;
  font-weight: bold;
  margin: 0;
`;

export default function DocumentsFinalMessage() {
  const { orderData } = useOrderData();

  return (
    <FinalMessage>
      <ExplicationText>
        Por favor, realiza los pasos descritos en el correo que hemos enviado a
        <BoldText>{orderData.billData.email}</BoldText>
        para finalizar el trámite
        <br />
        <br />
        En el plazo de 1 a 2 semanas recibirá el permiso de circulación a la
        dirección <BoldText>{orderData.documents.shippingAdress}</BoldText>
      </ExplicationText>
    </FinalMessage>
  );
}
