import { css } from "styled-components";

export const colors = {
  black: "#111111",
  primaryColor: "#4154F1",
  secondaryColor: "#8080FF",
  primaryGrey: "#787878",
  secondaryGrey: "rgb(230, 230, 230, 40)",
  placeholderGrey: "rgb(118, 118, 118)",
  lightGrey: "#ccc",
  primaryGreen: "#30C03A",
  errorRed: "#CA2020",
};

export const styles = {
  link: css`
    font-size: 13px;
    color: ${colors.primaryColor};
    text-decoration: underline;
    white-space: nowrap;
    cursor: pointer;
  `,
};
