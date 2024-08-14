import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerStyled = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-left-color: #ffffff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: ${rotate} 1s linear infinite;
`;

export default function Spinner() {
  return <SpinnerStyled />;
}
