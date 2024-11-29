import styled from 'styled-components';
import { useState } from 'react';
import fieldWithVisibility, { WrappedInputProps } from '@modules/vehicle-form/HOC/filedWithVisibility';
import { colors } from '../utils/styles';



interface InputProps extends React.HTMLProps<HTMLInputElement> {
  title: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: 'text' | 'number' | 'email';
  fixedValue?: string;
  isSmall?: boolean;
  width?: string;
}

function Input({ title, value, type = 'text', handleChange, fixedValue, isSmall, width = '100%', ...props }: InputProps) {
  const [borderActive, setBorderActive] = useState(false);

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setBorderActive(value !== '');
  };

  return (
    <Container>
      <InputStyled $isActive={borderActive} $isSmall={isSmall} $width={width}>
        <LabelContainer>
          {fixedValue && <FixedValue>{fixedValue}</FixedValue>}
          <StyledInput
            required
            type={type}
            placeholder={title}
            onFocus={() => setBorderActive(true)}
            onBlur={handleBlur}
            value={value}
            onChange={handleChange}
            {...props}
          />
        </LabelContainer>
      </InputStyled>
    </Container>
  );
}

export default fieldWithVisibility<WrappedInputProps>(Input);

interface InputStyledProps {
  $isActive: boolean;
  $isSmall?: boolean;
  $width?: string;
  $border?: string;
  value?: string;
}

const Container = styled.div``;

const InputStyled = styled.div<InputStyledProps>`
  width: ${({ $width }) => ($width ? $width : '100%')};
  border: ${({ $isActive }) => ($isActive ? '2px' : '1px')} solid ${({ $isActive }) => ($isActive ? colors.primaryColor : colors.lightGrey)};
  border: ${({ value }) => value && `2px solid ${colors.primaryGreen}`};
  border: ${({ $border }) => $border && `${$border}`};
  border-radius: 4px;
  padding: ${({ $isSmall }) => ($isSmall ? '3px 7px' : '5px 10px')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
`;

const StyledInput = styled.input`
  border: none !important;
  outline: none !important;
  font-size: 16px !important;
  width: 100% !important;
  appearance: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  -moz-appearance: textfield;
  padding: 0 !important;
  background-color: transparent !important;
  color: ${colors.black} !important;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0 !important;
  }
`;

const LabelContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  color: ${colors.placeholderGrey};
  font-size: 16px;
  line-height: normal;
`;

const FixedValue = styled.span`
  color: ${colors.black};
  font-size: 14px;
  line-height: normal;
`;