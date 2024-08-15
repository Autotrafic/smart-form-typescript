import styled from "styled-components";
import { colors } from "../../../../utils/constants";
import { Car, Caravan, Motorbike } from "../../../../utils/svgs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useOrderData } from "../../../core/context/orderData";

const Container = styled.div`
  width: 100%;
  border: ${({ selected }) =>
    `1px solid ${selected ? colors.primaryColor : colors.primaryGrey}`};
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
`;

const DocumentsContainer = styled.div`
  background-color: ${({ selected }) =>
    selected ? colors.secondaryColor : "#fff"};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em 0;
  border-radius: 8px 8px 0 0;
  height: 50px;
`;

const TextContainer = styled.div`
  background-color: ${({ selected }) =>
    selected ? colors.primaryColor : colors.secondaryGrey};
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.2em;
  align-items: center;
  border-radius: 0 0 8px 8px;
  height: 40px;
`;

const Text = styled.span`
  color: ${({ selected }) => (selected ? "#fff" : colors.primaryGrey)};
  margin: 0;
  font-size: ${({ selected }) => (selected ? "14px" : "13px")};
  font-weight: 500;
  line-height: normal;
`;

const UserIconSelected = styled(FontAwesomeIcon)`
  color: ${({ $selected }) => ($selected ? "#fff" : colors.primaryGrey)};
  width: 30px;
  height: 30px;
`;
const UserIcon = styled(FontAwesomeIcon)`
  color: ${({ $selected }) => ($selected ? "#fff" : colors.primaryGrey)};
  width: 30px;
  height: 30px;
`;

export default function DocumentsButton({ type, selected = false }) {
  const { orderData } = useOrderData();

  return (
    <Container selected={selected} name="type">
      <DocumentsContainer selected={selected}>
        {type === 1 && <UserIconSelected $selected={selected} icon={faUser} />}
        {type === 2 && <UserIcon $selected={selected} icon={faUser} />}
        {type === 3 && (
          <>
            {orderData.vehicleForm.vehicleType === 1 && (
              <Car color={selected ? "#fff" : colors.primaryGrey} />
            )}
            {orderData.vehicleForm.vehicleType === 2 && (
              <Motorbike color={selected ? "#fff" : colors.primaryGrey} />
            )}
            {orderData.vehicleForm.vehicleType === 3 && (
              <Caravan color={selected ? "#fff" : colors.primaryGrey} />
            )}
          </>
        )}
      </DocumentsContainer>
      <TextContainer selected={selected}>
        {type === 1 && (
          <>
            <Text selected={selected}>Vendedor</Text>
          </>
        )}
        {type === 2 && (
          <>
            <Text selected={selected}>Comprador</Text>
          </>
        )}
        {type === 3 && (
          <>
            <Text selected={selected}>Vehículo</Text>
          </>
        )}
      </TextContainer>
    </Container>
  );
}
