import { useOrderData } from '@modules/core/context/orderData';
import { NOTIFICATIONS_EMAIL } from '@modules/core/utils/constants';
import FinalMessage from '../final-message/FinalMessage';
import styled from 'styled-components';

const ExplicationText = styled.p`
  font-size: 18px;
`;

const EmailText = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

export default function DocumentsLaterMessage() {
  const { orderData } = useOrderData();

  const emailjs = require('emailjs-com');
  const templateParams = {
    user_email: `${orderData.documentsLaterData.documentsLaterEmail}, ${NOTIFICATIONS_EMAIL}`,
  };

  emailjs.send('service_5lr8jdc', 'template_07tnfew', templateParams, 'p4ieMe8wklkzdu-TK').then(
    (response) => {
      console.log('SUCCESS!', response.status, response.text);
    },
    (err) => {
      console.log('FAILED...', err);
    }
  );

  return (
    <FinalMessage>
      <ExplicationText>
        Ha recibido un correo a<EmailText>{orderData.documentsLaterData.documentsLaterEmail}</EmailText>
        con los siguientes pasos para acabar de realizar el trámite.
      </ExplicationText>
    </FinalMessage>
  );
}
