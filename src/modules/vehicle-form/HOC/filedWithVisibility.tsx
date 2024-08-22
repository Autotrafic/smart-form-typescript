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

export interface WrappedInputProps {
  isVisible: boolean;
  title: string;
  isLoading: boolean;
  options: IDropdownOptions;
  value: string;
  isFilled: boolean;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  fontSize: string;
  isSmall: boolean;
  type: 'text';
  fixedValue: string;
  width: number;
}

export interface WrappedDropdownProps {
  isVisible: boolean;
  title: string;
  options: IDropdownOptions;
  value: string;
  isFilled: boolean;
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
  isLoading?: boolean;
  fontSize?: `${string}px`;
}

type WrappedProps = WrappedInputProps | WrappedDropdownProps;

const fieldWithVisibility =
  <P extends WrappedProps>(WrappedComponent: React.ComponentType<P>) =>
  (props: P) => {
    return (
      <Container {...props}>
        <WrappedComponent {...props} />
      </Container>
    );
  };

export default fieldWithVisibility;
