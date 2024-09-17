import styled from 'styled-components';
import { useVehiclesForm } from '../context/vehiclesForm';
import DatePicker from '@modules/core/design-system/DatePicker';
import Dropdown from '@modules/core/design-system/Dropdown';
import PhoneNumberInput from '@modules/core/components/PhoneNumberInput';
import LegalCheckbox from '@modules/core/components/LegalCheckbox';
import { parseStringVehicleDataToObject } from '../utils/formatter';
import { IVehicleFormData } from '../interfaces';
import { IPropertyToModifyProps } from '../interfaces/states';
import { MotorbikeCCRange } from '../interfaces/import/enums';

const InputsGroupStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function InputsGroup() {
  const { formData, visibleFields, dropdowns, updateFormData } = useVehiclesForm();

  const isComponentVisible = (componentIndex: number) => visibleFields >= componentIndex;

  const handleChange = (value: string | boolean, propertyToModify: IPropertyToModifyProps) => {
    updateFormData((prev: IVehicleFormData) => ({
      ...prev,
      [propertyToModify]: value,
      inputsData: { ...prev.inputsData, [propertyToModify]: value },
    }));
  };

  const handleChangeVehicle = (value: string, propertyToModify: IPropertyToModifyProps) => {
    const parsedValue = parseStringVehicleDataToObject(value);

    updateFormData((prev: IVehicleFormData) => ({
      ...prev,
      vehicle: { ...prev.vehicle, [propertyToModify]: parsedValue },
      inputsData: { ...prev.inputsData, [propertyToModify]: value },
    }));
  };

  const handleChangeMotorbikeCC = (value: string) => {
    const parsedValue = parseStringVehicleDataToObject(value) as { cc: MotorbikeCCRange; value: number };
    const motorbikeValue = parsedValue.value;
    const motorbikeCc = parsedValue.cc;

    updateFormData((prev: IVehicleFormData) => ({
      ...prev,
      vehicle: { ...prev.vehicle, cc: motorbikeCc, value: motorbikeValue },
      inputsData: { ...prev.inputsData, cc: value },
    }));
  };

  return (
    <InputsGroupStyled>
      <DatePicker updateFormData={updateFormData} formData={formData} />
      {dropdowns.map((dropdown, index) => {
        const { propertyName, title, options, value, isFilled, isVehicleData, isLoading, disabled } = dropdown;
        const handler = isVehicleData
          ? propertyName === 'cc'
            ? handleChangeMotorbikeCC
            : handleChangeVehicle
          : handleChange;
        return (
          <Dropdown
            key={propertyName}
            isLoading={isLoading}
            isVisible={isComponentVisible(index + 1)}
            title={title}
            options={options}
            disabled={disabled}
            value={value}
            isFilled={isFilled}
            handleChange={(e: React.ChangeEvent<HTMLSelectElement>) => handler(e.target.value, propertyName)}
          />
        );
      })}

      <PhoneNumberInput
        isVisible={isComponentVisible(dropdowns.length + 1)}
        value={formData.phoneNumber}
        handleChange={(value: string) => handleChange(value, 'phoneNumber')}
      />
      <LegalCheckbox
        value={formData.inputsData.vehicleTermsAccepted}
        handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.checked, 'vehicleTermsAccepted')}
      />
    </InputsGroupStyled>
  );
}

export default InputsGroup;
