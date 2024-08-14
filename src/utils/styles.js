import { css } from "styled-components";
import { colors } from "./constants";

export const styles = {
  link: css`
    font-size: 13px;
    color: ${colors.primaryColor};
    text-decoration: underline;
    white-space: nowrap;
    cursor: pointer;
  `,
};
