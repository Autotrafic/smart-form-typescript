import styled from "styled-components";
import { useVehiclesForm } from "../context/vehiclesForm";
import DatePicker from "../../core/design-system/DatePicker";
import Dropdown from "../../core/design-system/Dropdown";
import PhoneNumberInput from "../../core/components/PhoneNumberInput";
import LegalCheckbox from "../../core/components/LegalCheckbox";

const InputsGroupStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function InputsGroup() {
  const { formData, visibleFields, loading, dropdowns, updateFormData } = useVehiclesForm();

  const isComponentVisible = (componentIndex) => visibleFields >= componentIndex;

  const handleChange = (value, propertyToModify) => {
    updateFormData((prev) => ({ ...prev, [propertyToModify]: value }));
  };

  return (
    <InputsGroupStyled>
      <DatePicker
        isVisible={isComponentVisible(0)}
        updateFormData={updateFormData}
        value={formData}
      />
      {dropdowns.map((dropdown, index) => (
        <Dropdown
          key={dropdown.propertyName}
          loading={loading[dropdown.propertyName]}
          isVisible={isComponentVisible(index + 1)}
          title={dropdown.title}
          options={dropdown?.options}
          value={formData[dropdown.propertyName]}
          handleChange={(value) => handleChange(value, dropdown.propertyName)}
        />
      ))}

      <PhoneNumberInput
        isVisible={isComponentVisible(dropdowns.length + 1)}
        value={formData.phoneNumber}
        handleChange={(value) => handleChange(value, "phoneNumber")}
      />
      <LegalCheckbox
        value={formData.vehicleTermsAccepted}
        handleChange={(e) => handleChange(e.target.checked, "vehicleTermsAccepted")}
      />
    </InputsGroupStyled>
  );
}

export default InputsGroup;
