import styled from 'styled-components';
import VehicleButton from './VehicleButton';
import { useVehiclesForm } from '../context/vehiclesForm';
import { colors } from '@modules/core/utils/styles';
import { VehicleType } from '../interfaces/enums';
import { vehiclesInitialState } from '../utils/initialStates';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 0.5em;

  @media (min-width: 476px) {
    gap: 1.5em;
  }
`;

const Label = styled.div`
  margin-bottom: 0.6em;
  color: ${colors.black};
  font-size: 14px;
`;

function VehicleButtonGroup() {
  const { formData, updateFormData } = useVehiclesForm();

  const { type: actualVehicleType } = formData.vehicle;

  const handleChangeVehicle = (vehicleType) => {
    updateFormData((prev) => ({ ...prev, vehicle: { ...prev.vehicle, type: vehicleType } }));
  };

  return (
    <div>
      <Label>Seleccione el tipo de vehículo:</Label>
      <Container>
        <VehicleButton
          type={VehicleType.CAR}
          selected={actualVehicleType === VehicleType.CAR}
          updateVehicleType={() => handleChangeVehicle(VehicleType.CAR)}
        />
        <VehicleButton
          type={VehicleType.MOTORBIKE}
          selected={actualVehicleType === VehicleType.MOTORBIKE}
          updateVehicleType={() => handleChangeVehicle(VehicleType.MOTORBIKE)}
        />
        {/* <VehicleButton
          type={3}
          selected={formData.vehicleType === 3}
          updateVehicleType={() => handleChangeVehicle(3)}
        /> */}
      </Container>
    </div>
  );
}

export default VehicleButtonGroup;
