import React from 'react';
import styled, { css } from 'styled-components';
import { IDropdownOptions } from '../interfaces/states';

interface ContainerProps {
  isVisible: boolean;
  isSmall?: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  transition: opacity 0.5s, transform 0.5s, max-height 0.5s ease-in-out, visibility 0s linear 0.5s;
  opacity: 0;
  transform: translateY(-20px);
  visibility: hidden;
  max-height: 0;
  overflow: hidden;

  ${(props) =>
    props.isVisible &&
    css`
      opacity: 1;
      transform: translateY(0);
      visibility: visible;
      transition-delay: 0s;
      max-height: 500px;
      overflow: visible;
      margin-bottom: ${props.isSmall ? '.4em' : '1em'};
    `}
`;

type WrappedComponentProps = {
  isVisible: boolean;
  isSmall?: boolean;
  title: string;
  loading: boolean;
  options: IDropdownOptions;
  value: string;
  hasValue: string;
  handleChange: (value: string) => void;
};

const fieldWithVisibility =
  <P extends WrappedComponentProps>(WrappedComponent: React.ComponentType<P>) =>
  (props: P) => {
    return (
      <Container {...props}>
        <WrappedComponent {...props} />
      </Container>
    );
  };

export default fieldWithVisibility;
