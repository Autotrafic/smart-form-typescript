import styled from "styled-components";
import { colors } from "../../utils/constants";
import { useState } from "react";
import fieldWithVisibility from "../../HOC/fieldWithVisibility";

const Container = styled.div``;

const InputStyled = styled.div`
  width: ${({ $width }) => ($width ? $width : "100%")};
  border: ${({ $isActive }) => ($isActive ? "2px" : "1px")} solid
    ${({ $isActive }) => ($isActive ? colors.primaryColor : colors.lightGrey)};
  border: ${({ value }) => value && `2px solid ${colors.primaryGreen}`};
  border: ${({ $border }) => $border && `${$border}`};
  border-radius: 4px;
  padding: ${({ $isSmall }) => ($isSmall ? "3px 7px" : "5px 10px")};
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

function Input({
  title,
  value,
  type = "text",
  handleChange,
  fixedValue,
  isSmall,
  width,
  ...props
}) {
  const [borderActive, setBorderActive] = useState(false);

  const handleBlur = (e) => {
    const value = e.target.value.trim();
    setBorderActive(value !== "");
  };

  return (
    <Container>
      <InputStyled
        $isActive={borderActive}
        $isSmall={isSmall}
        $width={width}
        $border={props?.border}
      >
        <LabelContainer>
          {fixedValue && <FixedValue>{fixedValue}</FixedValue>}
          <StyledInput
            required
            $isSmall={isSmall}
            $width={width}
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

export default fieldWithVisibility(Input);
