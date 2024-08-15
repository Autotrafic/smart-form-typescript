import React from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  width: 100%;
  transition: opacity 0.5s, transform 0.5s, max-height 0.5s ease-in-out, visibility 0s linear 0.5s;
  opacity: 0;
  transform: translateY(-20px);
  visibility: hidden;
  max-height: 0; // Start with max-height as 0
  overflow: hidden;

  ${(props) =>
    props.isVisible &&
    css`
      opacity: 1;
      transform: translateY(0);
      visibility: visible;
      transition-delay: 0s; // Apply transition delay only when hiding
      max-height: 500px; // Adjust based on your content needs
      overflow: visible;
      margin-bottom: ${({ isSmall }) => (isSmall ? ".4em" : "1em")};
    `}
`;

const fieldWithVisibility =
  (WrappedComponent) =>
  ({ ...props }) => {
    return (
      <Container {...props}>
        <WrappedComponent {...props} />
      </Container>
    );
  };

export default fieldWithVisibility;
