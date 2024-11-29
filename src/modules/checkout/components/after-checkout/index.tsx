import styled from 'styled-components';
import emailjs from 'emailjs-com';
import { useOrderData } from '@modules/core/context/orderData';
import { AUTOTRAFIC_EMAIL } from '@modules/core/utils/constants';
import { VehicleType } from '@modules/vehicle-form/interfaces/enums';
import Button from '@modules/core/design-system/Button';
import { UPLOAD_DOCUMENTS_URL } from '@modules/core/utils/urls';
import { CelebrationEmoji } from '@assets/svgs';

export default function AfterCheckoutMessage() {
  const { orderData } = useOrderData();

  return (
    <Container>
      <MessageContainer>
        <ConfirmationText>
          ¡Pago confirmado con éxito! <Emoji width={24} height={24} />
        </ConfirmationText>

        <TopExplicationText>El siguiente paso es adjuntar la documentación de tu vehículo.</TopExplicationText>
        <TopExplicationText>
          Te hemos enviado un correo electrónico{' '}
          {orderData.billData.email && (
            <>
              a la dirección:
              <TopBoldText> {orderData.billData.email} </TopBoldText>
            </>
          )}
          con los detalles de tu pedido y un enlace para subir los documentos.
        </TopExplicationText>
        <TopExplicationText>
          No es necesario que los subas de inmediato, puedes hacerlo cuando te sea más conveniente. Si deseas acelerar el
          proceso, puedes adjuntarlos ahora mismo:
        </TopExplicationText>
      </MessageContainer>
      <ButtonContainer>
        <a href={`${UPLOAD_DOCUMENTS_URL}/${orderData.orderId}`}>
          <Button title="Subir documentos" />
        </a>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 70px;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 12% 0 12%;
  text-align: center;
  color: #111111;
`;

const Emoji = styled(CelebrationEmoji)`
  margin-left: 10px;
`;

const ConfirmationText = styled.span`
  margin: 0;
  font-size: 17px;
  font-weight: bold;
  margin-top: 50px;
  margin-bottom: 20px;
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

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
