import styled from "styled-components";
import Title from "../../core/design-system/Title";
import VehicleButtonGroup from "./VehicleButtonGroup";
import InputsGroup from "./InputsGroup";
import Button from "../../core/design-system/Button";
import { useVehiclesForm } from "../context/vehiclesForm";

const StyledForm = styled.form`
  background: #ffffff;
  border-radius: 8px;
  font-family: Montserrat, sans-serif;
  padding: 10px;

  @media (min-width: 550px) {
    padding: 10px 45px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3em;
`;

const VehiclesForm = () => {
  const { loading, submitForm } = useVehiclesForm();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await submitForm();
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Title>Presupuesto gratuito al instante</Title>
      <FormGroup>
        <VehicleButtonGroup />
        <InputsGroup />
      </FormGroup>
      <Button
        title="Obtener precio ahora"
        loading={loading.itp}
        loadingText="Calculando..."
      />
    </StyledForm>
  );
};

export default VehiclesForm;
