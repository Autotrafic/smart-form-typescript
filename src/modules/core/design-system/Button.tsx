import React from 'react';
import styled from 'styled-components';
import { colors } from '../utils/styles';

interface ButtonStyledProps {
  $variant: 'primary' | 'secondary';
}

const Container = styled.div``;

const ButtonStyled = styled.button<ButtonStyledProps>`
  padding: 14px 23px !important;
  background-color: ${({ $variant }) => ($variant === 'secondary' ? '#fff' : colors.primaryColor)} !important;
  border: ${({ $variant }) => ($variant === 'secondary' ? `2px solid ${colors.primaryColor}` : 'none')} !important;
  border-radius: 5px !important;
  color: ${({ $variant }) => ($variant === 'secondary' ? colors.primaryColor : '#fff')} !important;
  font-size: 15px !important;
  font-weight: 600 !important;
  display: inline-block !important;
  cursor: pointer !important;
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  title: string;
  loading?: boolean;
  loadingText?: string;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', title, loading, loadingText, ...props }) => {
  return (
    <Container>
      <ButtonStyled $variant={variant} {...props}>
        {loading ? loadingText : title}
      </ButtonStyled>
    </Container>
  );
};

export default Button;
