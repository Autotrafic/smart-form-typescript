import styled from 'styled-components';
import { useVehiclesForm } from '../context/vehiclesForm';
import DatePicker from '@modules/core/design-system/DatePicker';
import Dropdown from '@modules/core/design-system/Dropdown';
import PhoneNumberInput from '@modules/core/components/PhoneNumberInput';
import LegalCheckbox from '@modules/core/components/LegalCheckbox';
import { parseStringVehicleDataToObject } from '../utils/formatter';

const InputsGroupStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function InputsGroup() {
  const { formData, visibleFields, loading, dropdowns, updateFormData } = useVehiclesForm();

  const isComponentVisible = (componentIndex: number) => visibleFields >= componentIndex;

  const handleChange = (value, propertyToModify) => {
    updateFormData((prev) => ({
      ...prev,
      [propertyToModify]: value,
      inputsData: { ...prev.inputsData, [propertyToModify]: value },
    }));
  };

  const handleChangeVehicle = (value, propertyToModify) => {
    const parsedValue = parseStringVehicleDataToObject(value);

    updateFormData((prev) => ({
      ...prev,
      vehicle: { ...prev.vehicle, [propertyToModify]: parsedValue },
      inputsData: { ...prev.inputsData, [propertyToModify]: value },
    }));
  };

  return (
    <InputsGroupStyled>
      <DatePicker isVisible={isComponentVisible(0)} updateFormData={updateFormData} value={formData} />
      {dropdowns.map((dropdown, index) => {
        const { propertyName, title, options, value, isFilled, isVehicleData } = dropdown;
        const handler = isVehicleData ? handleChangeVehicle : handleChange;
        return (
          <Dropdown
            key={propertyName}
            loading={loading[propertyName]}
            isVisible={isComponentVisible(index + 1)}
            title={title}
            options={options}
            value={value}
            hasValue={isFilled}
            handleChange={(value) => handler(value, propertyName)}
          />
        );
      })}

      <PhoneNumberInput
        isVisible={isComponentVisible(dropdowns.length + 1)}
        value={formData.phoneNumber}
        handleChange={(value) => handleChange(value, 'phoneNumber')}
      />
      <LegalCheckbox
        value={formData.vehicleTermsAccepted}
        handleChange={(e) => handleChange(e.target.checked, 'vehicleTermsAccepted')}
      />
    </InputsGroupStyled>
  );
}

export default InputsGroup;
