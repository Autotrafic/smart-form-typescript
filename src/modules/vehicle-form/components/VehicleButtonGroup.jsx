import styled from "styled-components";
import VehicleButton from "./VehicleButton";
import { useVehiclesForm } from "../context/vehiclesForm";
import { colors } from "../../core/utils/styles";

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

  const handleChangeVehicle = (vehicleType) => {
    updateFormData((prev) => ({ ...prev, vehicleType }));
  };

  return (
    <div>
      <Label>Seleccione el tipo de vehículo:</Label>
      <Container>
        <VehicleButton
          type={1}
          selected={formData.vehicleType === 1}
          updateVehicleType={() => handleChangeVehicle(1)}
        />
        <VehicleButton
          type={2}
          selected={formData.vehicleType === 2}
          updateVehicleType={() => handleChangeVehicle(2)}
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
