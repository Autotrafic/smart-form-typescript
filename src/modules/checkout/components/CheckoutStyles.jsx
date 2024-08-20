import styled, { css } from "styled-components";
import { colors } from "@modules/core/utils/styles";

export const nestedContent = css`
  margin: 0;
  padding: 0 0 0 1em;
  display: flex;
  flex-direction: column;
  gap: 0.2em;
`;

export const ResumeList = styled.ul`
  ${nestedContent}
`;

export const ItemTitle = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: ${colors.black} !important;
`;

export const ItemContent = styled.span`
  font-size: 14px;
  text-align: end;
  color: ${colors.black};

  @media (max-width: 476px) {
    max-width: 180px;
  }
`;

export const ResumeItem = styled.li`
  width: 100%;
  display: flex;
  gap: 0.4em;
  align-items: center;
  justify-content: space-between;
`;

export const BillForm = styled.form`
  ${nestedContent};
`;
