import { useState } from "react";
import { colors } from "../../../utils/constants";
import Input from "../../reusable/Input";
import LegalCheckbox from "../../reusable/LegalCheckbox";
import Title from "../../reusable/Title";
import styled, { keyframes } from "styled-components";
import { useOrderData } from "../../../context/orderData";
import { updateNestedOrder } from "../../../services/orderService";
import { sendLaterDocumentsEmail } from "../../../utils/email";

const deslizarDesdeIzquierda = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const Container = styled.div`
  width: 100%;
  min-height: 600px;
  padding: 1em 1.4em 1.6em 1.4em;
  display: flex;
  flex-direction: column;
  gap: 0.6em;
  background-color: #f7f7f7;
  position: absolute;
  z-index: 10;
  left: 0;
  animation: ${deslizarDesdeIzquierda} 0.5s ease-out forwards;

  @media (max-width: 476px) {
    padding: 1em 2em;
  }
`;

const SendLaterTitle = styled.p`
  font-size: 20px;
  margin: 10px 0 5px 0;
`;

const SendLaterText = styled.p`
  font-size: 14px;
  margin: 0;
`;

const InputsContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 50px;
`;

const InputsLabel = styled.p`
  font-size: 14px;
  margin: 3px;
`;

const BottomButtonsStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NextButtonStyled = styled.button`
  padding: 10px 10px;
  background-color: ${colors.primaryColor};
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
  cursor: pointer;
  width: 120px;
`;
const BackButtonStyled = styled.button`
  padding: 10px 10px;
  border: 1px solid ${colors.primaryColor};
  border-radius: 5px;
  color: ${colors.primaryColor};
  background-color: white;
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
  cursor: pointer;
  width: 120px;
`;

export default function DocumentsLater({
  setIsDocumentsLaterOpen
}) {
  const { orderData, updateOrderData } = useOrderData();

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [documentsLaterData, setSendLaterData] = useState({
    vehiclePlate: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    updateOrderData((prev) => ({
      ...prev,
      documentsLaterData: documentsLaterData,
    }));

    sendLaterDocumentsEmail(orderData);

    await updateNestedOrder(orderData.orderId, {
      generalData: { ...documentsLaterData },
    });


    window.location.href = `https://transferencia.autotrafic.es/documentacion-pendiente/${orderData.orderId}`;
  };

  const handleBackClick = () => {
    setIsDocumentsLaterOpen(false);
  };

  return (
    <Container>
      <Title style={{ fontWeight: 600 }}>Documentos</Title>
      <SendLaterTitle>Enviar documentos más tarde:</SendLaterTitle>
      <SendLaterText>
        Te enviaremos un correo electrónico indicando los documentos que
        necesitamos para realizar el trámite.
      </SendLaterText>
      <SendLaterText>
        Responde al mismo correo adjuntando la documentación.
      </SendLaterText>
      <InputsContainer onSubmit={handleSubmit}>
        <div style={{ marginBottom: "40px" }}>
          <InputsLabel>Matrícula del vehículo</InputsLabel>
          <Input
            isVisible={true}
            style={{ margin: 0 }}
            minLength="7"
            maxLength="8"
            required={true}
            value={documentsLaterData.vehiclePlate}
            handleChange={(e) =>
              setSendLaterData((prev) => ({
                ...prev,
                vehiclePlate: e.target.value.toUpperCase(),
              }))
            }
            border={`1px solid ${colors.primaryColor}`}
          />
        </div>
        <LegalCheckbox
          value={termsAccepted}
          handleChange={(e) => setTermsAccepted(e.target.checked)}
        />
        <BottomButtonsStyled>
          <BackButtonStyled type="button" onClick={handleBackClick}>
            Atrás
          </BackButtonStyled>
          <NextButtonStyled type="submit">Siguiente</NextButtonStyled>
        </BottomButtonsStyled>
      </InputsContainer>
    </Container>
  );
}
