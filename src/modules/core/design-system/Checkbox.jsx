import React from "react";
import styled from "styled-components";

const CheckboxWrapper = styled.div`
  display: inline-block;
  display: flex;
  align-items: center;
`;

const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  height: 18px !important; /* Adjusted height */
  width: 18px !important; /* Adjusted width */
  padding: 0 !important;
  outline: none !important;
  display: inline-block !important;
  vertical-align: top !important;
  position: relative !important;
  margin: 0 !important;
  cursor: pointer !important;
  border: 1px solid #bbc1e1 !important;
  background: #fff !important;
  border-radius: 4px !important; /* Adjusted border-radius */
  transition: background 0.3s !important, border-color 0.3s !important, box-shadow 0.2s !important;

  &:checked {
    background-color: #275efe !important;
    border-color: #275efe !important;
  }

  &:checked:after {
    content: "" !important;
    position: absolute !important;
    left: 5px !important; /* Adjusted left position */
    top: 2px !important; /* Adjusted top position */
    width: 4px !important;
    height: 8px !important;
    border: solid #fff !important;
    border-width: 0 3px 3px 0 !important;
    border-radius: 1px !important;
    transform: rotate(45deg) !important;
  }

  &:hover:not(:checked) {
    border-color: #275efe !important;
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(39, 94, 254, 0.3) !important;
  }

  &:disabled {
    background: #f6f8ff !important;
    cursor: not-allowed !important;
    opacity: 0.9 !important;
  }

  &:disabled:checked {
    background: #e1e6f9 !important;
    border-color: #bbc1e1 !important;
  }

  &:disabled + label {
    cursor: not-allowed !important;
  }
`;

function Checkbox({ ...rest }) {
  return (
    <CheckboxWrapper>
      <StyledCheckbox {...rest} />
    </CheckboxWrapper>
  );
}

export default Checkbox;
