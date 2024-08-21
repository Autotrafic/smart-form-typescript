import styled from 'styled-components';
import { Car, Motorbike } from '@assets/svgs';
import { colors } from '@modules/core/utils/styles';
import { VehicleType } from '../interfaces/enums';

interface IStyledProps {
  selected: boolean;
}

const Container = styled.div<IStyledProps>`
  max-width: 120px;
  width: 100%;
  border: ${({ selected }) => `1px solid ${selected ? colors.primaryColor : colors.primaryGrey}`};
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
`;

const VehicleContainer = styled.div<IStyledProps>`
  background-color: ${({ selected }) => (selected ? colors.secondaryColor : '#fff')};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em 0;
  border-radius: 8px 8px 0 0;
  height: 40px;
`;

const TextContainer = styled.div<IStyledProps>`
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

const Text = styled.span<IStyledProps>`
  color: ${({ selected }) => (selected ? '#fff' : colors.primaryGrey)};
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  line-height: normal;
`;

interface IVehicleButtonProps {
  type: VehicleType;
  isSelected: boolean;
  updateVehicleType: () => void;
}

function VehicleButton({ type, isSelected = false, updateVehicleType }: IVehicleButtonProps) {
  return (
    <Container selected={isSelected} onClick={updateVehicleType}>
      <VehicleContainer selected={isSelected}>
        {type === 1 && <Car color={isSelected ? '#fff' : colors.primaryGrey} />}
        {type === 2 && <Motorbike color={isSelected ? '#fff' : colors.primaryGrey} />}
        {/* {type === 3 && <Caravan color={isSelected ? '#fff' : colors.primaryGrey} />} */}
      </VehicleContainer>
      <TextContainer selected={isSelected}>
        {type === 1 && (
          <>
            <Text selected={isSelected}>Coche</Text>
            <Text selected={isSelected}>Autocaravana</Text>
          </>
        )}
        {type === 2 && (
          <>
            <Text selected={isSelected}>Moto</Text>
            <Text selected={isSelected}>Ciclomotor</Text>
            <Text selected={isSelected}>Quad</Text>
          </>
        )}
        {/* {type === 3 && (
          <>
            <Text selected={isSelected}>Caravana</Text>
            <Text selected={isSelected}>Remolque</Text>
          </>
        )} */}
      </TextContainer>
    </Container>
  );
}

export default VehicleButton;
