import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import fieldWithVisibility, { WrappedDropdownProps } from '@modules/vehicle-form/HOC/filedWithVisibility';
import { colors } from '../utils/styles';
import { IDropdownOptions, IDropdownValue } from '@modules/vehicle-form/interfaces/states';

interface StyledSelectProps {
  $fontSize?: string;
  $hasValue?: boolean;
  $disabled?: boolean;
}

const SelectContainer = styled.div`
  width: 100%;
  height: 33px;
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid ${colors.lightGrey};
  border-radius: 4px;
  background: white;
  overflow: hidden;
  color: blue;
`;

const StyledSelect = styled.select<StyledSelectProps>`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  padding: 8px 10px;
  width: 100%;
  font-size: ${({ $fontSize }) => $fontSize};
  cursor: pointer;
  background: ${({ $disabled }) => ($disabled ? colors.backgroundDisabled : 'transparent')};
  text-align: left;
  color: ${({ $hasValue }) => ($hasValue ? colors.black : colors.placeholderGrey)};

  &:focus {
    outline: none;
  }

  @media (min-width: 476px) {
    font-size: 15px;
  }
`;

const TitleOption = styled.option`
  color: ${colors.placeholderGrey};
`;

const Icon = styled(FontAwesomeIcon)<StyledSelectProps>`
  position: absolute;
  right: 10px;
  min-width: 22px;
  pointer-events: none;
  background-color: ${({$disabled }) => ($disabled ? colors.backgroundDisabled : 'white')};
`;

interface DropdownProps {
  title: string;
  options: IDropdownOptions;
  value: IDropdownValue;
  isFilled: boolean;
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
  disabled: boolean;
  isLoading?: boolean;
  fontSize?: string;
  defaultValue?: string;
}

const Dropdown = ({
  title,
  options,
  value,
  isFilled,
  handleChange,
  disabled,
  isLoading,
  fontSize = '15px',
  defaultValue = '',
}: DropdownProps) => {
  return (
    <SelectContainer>
      <StyledSelect
        required
        $hasValue={isFilled}
        $fontSize={fontSize}
        $disabled={disabled}
        disabled={isLoading || disabled}
        value={typeof value === 'object' ? JSON.stringify(value) : value}
        onChange={handleChange}
      >
        <TitleOption value={defaultValue}>{isLoading ? 'Cargando...' : title}</TitleOption>
        {options?.map((option: { value: string; name: string }, index: number) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </StyledSelect>
      <Icon icon={faChevronDown} color={colors.primaryColor} $disabled={disabled} />
    </SelectContainer>
  );
};

export default fieldWithVisibility<WrappedDropdownProps>(Dropdown);
