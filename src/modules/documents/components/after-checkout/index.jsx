import styled from 'styled-components';
import emailjs from 'emailjs-com';
import { useOrderData } from '@modules/core/context/orderData';
import NavigationButtons from '@modules/core/components/NavigationButtons';
import { AUTOTRAFIC_EMAIL } from '@modules/core/utils/constants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 140px;
  padding-bottom: 70px;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 12% 30px 12%;
  text-align: center;
  color: #111111;
`;

const ConfirmationText = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  margin-top: 50px;
`;

const TopExplicationText = styled.p`
  font-size: 16px;
  margin-bottom: 30px;
`;
const TopBoldText = styled.span`
  font-size: 15px;
  font-weight: bold;
  margin: 0;
`;

const ExplicationText = styled.p`
  font-size: 18px;
`;

const BoldText = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  padding: 0 30px;
`;

export default function AfterCheckoutMessage() {
  const { orderData } = useOrderData();

  const templateParams = {
    customer_name: orderData.billData.fullName,
    vehicle: `${
      orderData.vehicleForm.vehicleType === 1
        ? orderData.vehicleForm.brand + '  ' + orderData.vehicleForm.model.modelName
        : 'Moto'
    }`,
    order_cost: orderData.prices.totalPrice,
    user_email: `${orderData.billData.email}, ${AUTOTRAFIC_EMAIL}`,
  };

  emailjs.send('service_5lr8jdc', 'template_se2isto', templateParams, 'p4ieMe8wklkzdu-TK').then(
    (response) => {
      console.log('SUCCESS!', response.status, response.text);
    },
    (err) => {
      console.log('FAILED...', err);
    }
  );

  return (
    <Container>
      <MessageContainer>
        <ConfirmationText>
          ¡Recibido! ✅ <br /> Pago realizado con éxito.
        </ConfirmationText>
        <TopExplicationText>
          Acaba de recibir un correo electrónico de confirmación a la dirección
          <TopBoldText> {orderData.billData.email}</TopBoldText>
        </TopExplicationText>
        <ExplicationText>
          Pulse el botón
          <BoldText> 'Siguiente' </BoldText> para adjuntar los documentos y finalizar el trámite.
        </ExplicationText>
      </MessageContainer>
      <ButtonContainer>
        <NavigationButtons onlyNext />
      </ButtonContainer>
    </Container>
  );
}
