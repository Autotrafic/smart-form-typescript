import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import fieldWithVisibility from '../../vehicle-form/HOC/filedWithVisibility';
import { colors } from '../utils/styles';

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

const StyledSelect = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  padding: 8px 10px;
  width: 100%;
  font-size: ${({ $fontSize }) => $fontSize};
  cursor: pointer;
  background: transparent;
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

const Icon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 10px;
  min-width: 22px;
  pointer-events: none;
  background-color: white;
`;

const Dropdown = ({ title, options, value, hasValue, defaultValue = '', handleChange, loading, fontSize = '15px' }) => {
  return (
    <SelectContainer>
      <StyledSelect
        required
        onChange={(e) => handleChange(e.target.value)}
        $hasValue={hasValue}
        $fontSize={fontSize}
        disabled={loading}
        value={typeof value === 'object' ? JSON.stringify(value) : value}
      >
        <TitleOption value={defaultValue}>{loading ? 'Cargando...' : title}</TitleOption>
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </StyledSelect>
      <Icon icon={faChevronDown} color={colors.primaryColor} />
    </SelectContainer>
  );
};

export default fieldWithVisibility(Dropdown);
