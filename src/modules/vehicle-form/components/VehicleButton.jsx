import styled from "styled-components";
import { Car, Caravan, Motorbike } from "../../../assets/svgs";
import { colors } from "../../core/utils/styles";

const Container = styled.div`
max-width: 120px;
  width: 100%;
  border: ${({ selected }) => `1px solid ${selected ? colors.primaryColor : colors.primaryGrey}`};
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
`;

const VehicleContainer = styled.div`
  background-color: ${({ selected }) => (selected ? colors.secondaryColor : "#fff")};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em 0;
  border-radius: 8px 8px 0 0;
  height: 40px;
`;

const TextContainer = styled.div`
  background-color: ${({ selected }) => (selected ? colors.primaryColor : colors.secondaryGrey)};
  padding: 0.8em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.2em;
  align-items: center;
  border-radius: 0 0 8px 8px;
  height: 70px;
`;

const Text = styled.span`
  color: ${({ selected }) => (selected ? "#fff" : colors.primaryGrey)};
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  line-height: normal;
`;

function VehicleButton({ type, selected = false, updateVehicleType }) {
  return (
    <Container selected={selected} onClick={updateVehicleType} name="type">
      <VehicleContainer selected={selected}>
        {type === 1 && <Car color={selected ? "#fff" : colors.primaryGrey} />}
        {type === 2 && <Motorbike color={selected ? "#fff" : colors.primaryGrey} />}
        {type === 3 && <Caravan color={selected ? "#fff" : colors.primaryGrey} />}
      </VehicleContainer>
      <TextContainer selected={selected}>
        {type === 1 && (
          <>
            <Text selected={selected}>Coche</Text>
            <Text selected={selected}>Autocaravana</Text>
          </>
        )}
        {type === 2 && (
          <>
            <Text selected={selected}>Moto</Text>
            <Text selected={selected}>Ciclomotor</Text>
            <Text selected={selected}>Quad</Text>
          </>
        )}
        {type === 3 && (
          <>
            <Text selected={selected}>Caravana</Text>
            <Text selected={selected}>Remolque</Text>
          </>
        )}
      </TextContainer>
    </Container>
  );
}

export default VehicleButton;
