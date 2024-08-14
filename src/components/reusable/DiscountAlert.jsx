import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

export default function DiscountAlert() {
  return (
    <Container>
      <Icon icon={faTag} size="lg" />
      <TextContainer>
        <Title>Promoción aplicada con éxito</Title>
        <Description>Por venir de Historial Vehículo, pagas 10€ menos</Description>
      </TextContainer>
    </Container>
  );
}

const Container = styled.div`
  background-color: #e6fae8;
  border: 1px solid #bbeec1;
  border-radius: 3px;
  width: 100%;
  padding: 8px 10px;
  display: flex;
  gap: 5px;
`;

const Icon = styled(FontAwesomeIcon)`
  color: #24471f;
  margin: 6px 8px 0 8px;
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: #125512;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 15px;
  margin: 0;
  padding: 0;
  line-height: 18px;
`;

const Description = styled.p`
  font-weight: 500;
  font-size: 12px;
  margin: 0;
  padding: 0;
  line-height: 14px;
`;
